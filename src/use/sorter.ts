import { reactive, toRaw, watch } from 'vue'

export function useSorter(obj: object) {
  if (!window.Worker) {
    console.error('No worker support')
    return
  }

  const sorter = new Worker('/workers/sorter.js')

  const sorted = reactive({
    list: null,
    count: 0,
    total: 0,
  })

  const options = reactive({
    orderBy: 'createdAt',
    search: '',
    filterMy: {
      star: false,
      seen: true,
      trash: true,
    },
  })

  const throttledSort = throttle(sort, 400)

  watch(
    [obj, options],
    () => {
      if (obj) {
        throttledSort(obj)
      }
    },
    {
      immediate: true,
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
    sorted.total = e.data.total
  }

  function throttle(fn: Function, wait: number) {
    // https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca#gistcomment-3015837

    let previouslyRun: number, queuedToRun: number

    return function invokeFn(...args: unknown[]) {
      const now = Date.now()

      clearTimeout(queuedToRun)

      if (!previouslyRun || now - previouslyRun >= wait) {
        fn.apply(null, args)
        previouslyRun = now
      } else {
        queuedToRun = window.setTimeout(
          invokeFn.bind(null, ...args),
          wait - (now - previouslyRun),
        )
      }
    }
  }

  return {
    sorted,
    options,
  }
}
