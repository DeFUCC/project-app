onmessage = (e) => {
  sort(e)
}

function sort({ data }) {
  let list = Object.values(data.list)
  let countAll = list.length
  let { orderBy, search, filterMy } = data.options

  if (search) {
    list = list.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase())
    })
  }

  list = list.filter(Boolean)

  if (orderBy == 'AB') {
    list.sort(sortByAB)
  }
  if (orderBy == 'createdAt') {
    list.sort(sortByCreated)
  }

  if (orderBy == 'rating') {
    //   list.sort(sortByRating)
  }

  if (filterMy) {
    list = list.filter((item) => {
      if (
        item.myRate &&
        ((filterMy.star && item.myRate.star) ||
          (filterMy.seen && item.myRate.seen) ||
          (filterMy.trash && item.myRate.trash))
      ) {
        return false
      } else {
        return true
      }
    })
  }
  let count = list.length
  postMessage({ list, count, countAll })
}

function sortByRating(a, b) {
  let aS = countRates(a, 'star') - countRates(a, 'trash')
  let bS = countRates(b, 'star') - countRates(b, 'trash')
  if (aS == bS) {
    return countRates(a, 'seen') - countRates(b, 'seen')
  } else {
    return bS - aS
  }
}

function countRates(item, type) {
  return Object.keys(item.rated[type]).length
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
  return b.createdAt - a.createdAt
}
