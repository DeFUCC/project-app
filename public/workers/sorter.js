onmessage = (e) => {
  sort(e)
}

function sort({ data }) {
  let list = Object.values(data.list)
  let { orderBy, search } = data.options

  if (search) {
    list = list.filter((item) => {
      return item.title.includes(search)
    })
  }

  if (orderBy.AB) {
    list.sort(sortByAB)
  }
  if (orderBy.createdAt) {
    list.sort(sortByCreated)
  }

  postMessage(list)
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
