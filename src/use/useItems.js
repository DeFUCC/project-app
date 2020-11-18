import { reactive } from 'vue'
import { generateWords } from './randomWords.js'
import { itemColor } from './colors.js'
import { useSorter } from './useSorterWorker.js'
import { db, soul, gun } from '../store/gun-db.js'
import { notify } from '../store/history.js'

export function useItems({ type = 'project' } = {}) {
  const items = reactive({})

  const { sorted, options } = useSorter(items)

  db.get(type)
    .map()
    .on((data, key) => {
      if (items[key]) {
        items[key] = null
      }
      items[key] = data
      items[key].soul = soul(data)
    })

  function addItem() {
    let title = generateWords(2).join(' ')
    let userItem = gun
      .user()
      .get(type)
      .set(
        {
          title,
          createdAt: Date.now(),
        },
        (ack) => {
          if (!ack.err) {
            notify(`${type} ${title} has been added`)
          }
          db.get(type).set(userItem)
        },
      )
  }

  function formatDate(date) {
    return new Date(date).toLocaleString()
  }

  return {
    soul,
    items,
    options,
    sorted,
    addItem,
    itemColor,
    formatDate,
  }
}
