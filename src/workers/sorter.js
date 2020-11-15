onmessage = (e) => {
  sort(e)
}

function sort(e) {
  console.log(e)
}

function sortByAB(a, b) {
  let aTitle = a[1].title
  let bTitle = b[1].title
  if (typeof a[1].title == 'string') {
    aTitle = aTitle.toLowerCase()
  }
  if (typeof b[1].title == 'string') {
    bTitle = bTitle.toLowerCase()
  }

  if (aTitle > bTitle) {
    return 1
  }
  if (aTitle < bTitle) {
    return -1
  }
  if (aTitle == bTitle) {
    let aDesc = a[1].description.toLowerCase()
    let bDesc = b[1].description.toLowerCase()
    if (aDesc > bDesc) {
      return 1
    }
    if (aDesc < bDesc) {
      return -1
    }
  }
  return 0
}
