import { reactive, toRaw, watch } from 'vue'

export function useSorter(obj, options = reactive({})) {
  if (!window.Worker) {
    console.log('No worker support')
    return
  }
  const sorter = new Worker('./workers/sorter.js')
  const sorted = reactive({
    data: null,
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
    sort,
    sorted,
  }
}
