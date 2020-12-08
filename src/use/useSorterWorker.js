import { reactive, toRaw, watch } from 'vue'

export function useSorter(obj) {
  if (!window.Worker) {
    console.log('No worker support')
    return
  }
  const sorter = new Worker('./workers/sorter.js')
  const sorted = reactive({
    data: null,
    count: 0,
  })
  const options = reactive({
    orderBy: {
      AB: true,
      createdAt: true,
      modifiedAt: false,
    },
  })

  const throttledSort = throttle(sort, 100)

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

  async function sort(list) {
    sorter.postMessage({
      list: toRaw(list),
      options: toRaw(options),
    })
  }

  sorter.onmessage = (e) => {
    sorted.data = e.data
    sorted.count = e.data.length
  }

  function throttle(fn, wait) {
    // https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca#gistcomment-3015837

    let previouslyRun, queuedToRun

    return function invokeFn(...args) {
      const now = Date.now()

      queuedToRun = clearTimeout(queuedToRun)

      if (!previouslyRun || now - previouslyRun >= wait) {
        fn.apply(null, args)
        previouslyRun = now
      } else {
        queuedToRun = setTimeout(
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
