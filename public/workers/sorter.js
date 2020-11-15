onmessage = (e) => {
  sort(e)
}

function sort({ data }) {
  let list = Object.values(data.list)

  list.sort(sortByAB)
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
