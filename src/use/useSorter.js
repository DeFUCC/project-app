import { reactive, toRaw, watch } from 'vue'

export function useSorter(obj) {
  if (!window.Worker) {
    console.log('No worker support')
    return
  }
  const sorter = new Worker('./workers/sorter.js')
  const sorted = reactive({
    data: null,
  })
  const options = reactive({
    orderBy: {
      AB: true,
      createdAt: false,
      modifiedAt: false,
    },
  })

  watch([obj, options], () => {
    if (obj) {
      sort(obj)
    }
  })

  function sort(list) {
    sorter.postMessage({
      list: toRaw(list),
      options: toRaw(options),
    })
  }

  sorter.onmessage = (e) => {
    sorted.data = e.data
    sorted.count = e.data.length
  }

  return {
    sorted,
    options,
  }
}
