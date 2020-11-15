import { reactive, watch } from 'vue'

export function useSorter(obj) {
  const sorted = reactive({
    data: null,
    count: 0,
  })
  const options = reactive({
    orderBy: {
      AB: false,
      createdAt: true,
      modifiedAt: false,
    },
  })

  watch([obj, options], () => {
    if (obj) {
      sort(obj)
    }
  })

  function sort(list) {
    let data = Object.values(list)
    sorted.count = data.length
    if (options.orderBy.AB) {
      sorted.data = data.sort(sortByAB)
    } else if (options.orderBy.createdAt) {
      sorted.data = data.sort(sortByCreated)
    } else {
      sorted.data = data
    }
  }

  return {
    sorted,
    options,
  }
}

function sortByAB(a, b) {
  if (!a) {
    return -1
  }
  if (!b) {
    return 1
  }
  let aTitle = String(a.title).toLowerCase()
  let bTitle = String(b.title).toLowerCase()

  if (aTitle > bTitle) {
    return 1
  }
  if (aTitle < bTitle) {
    return -1
  }

  return 0
}

function sortByCreated(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1
  } else {
    return 1
  }
}
