import { debouncedWatch } from '@vueuse/core'
import { reactive, toRaw } from 'vue'

export function useSorter(obj: object) {
  if (!window.Worker) {
    console.error('No worker support')
    return
  }

  const sorter = new Worker('/workers/sorter.js')

  const options = reactive({
    orderBy: 'createdAt',
    search: '',
    status: {
      new: true,
      dev: true,
      process: true,
      product: true,
      pause: false,
      ondemand: false,
      finish: false,
    },
    filterMy: {
      star: false,
      seen: true,
      trash: true,
    },
    limit: 5,
    loading: true,
  })

  const sorted = reactive({
    list: null,
    count: 0,
    more: false,
    total: 0,
    status: {},
  })

  debouncedWatch(
    [obj, options],
    () => {
      if (obj) {
        sort(obj)
      }
    },
    {
      immediate: true,
      debounce: 300,
    },
  )

  function sort(list: object) {
    sorter.postMessage({
      list: toRaw(list),
      options: toRaw(options),
    })
  }

  sorter.onmessage = (e) => {
    sorted.list = e.data.list
    sorted.count = e.data.count
    sorted.more = e.data.more
    sorted.total = e.data.total
    sorted.status = e.data.statusCount
  }

  return {
    sorted,
    options,
  }
}
