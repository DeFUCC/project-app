import { reactive } from 'vue'
import { generateWords } from './randomWords.js'
import { useSorter } from './useSorterWorker.js'
import { db, soul, gun } from '../store/gun-db.js'
import { notify } from '../store/history.js'
import { generateItem } from './useItem.js'

export function useItems({
  type = 'project',
  mode = 'private',
  root = null,
} = {}) {
  const items = reactive({})

  getItems()

  const { sorted, options } = useSorter(items)

  function getItems() {
    let query
    if (root) {
      query = gun.get(root)
    } else {
      query = db
    }
    query
      .get(type)
      .map()
      .on((data, key) => {
        if (items[key]) {
          items[key] = null
        }
        items[key] = data
        items[key].soul = soul(data)
        items[key].author = reactive({})
        gun
          .user(key.substring(1, 88))
          .once((userIs) => {
            if (userIs) {
              items[key].author.alias = userIs?.alias
            }
          })
          .get('profile')
          .get('avatar')
          .on((d) => {
            items[key].author.avatar = d
          })
      })
  }

  async function addItem() {
    let title = generateWords(2).join(' ')
    if (mode == 'private') {
      let userItem = gun
        .user()
        .get(type)
        .set(generateItem(type), (ack) => {
          if (!ack.err) {
            notify(`${type} has been added`)
          }
          db.get(type).set(userItem)
        })
    }
    if (mode == 'public') {
      db.get(type).set(generateItem(type), (ack) => {
        if (!ack.err) {
          notify(`${type}  has been added`)
        }
      })
    }
  }

  return {
    items,
    options,
    sorted,
    addItem,
  }
}
