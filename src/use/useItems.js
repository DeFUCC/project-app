import { reactive, ref } from 'vue'
import { useSorter } from './useSorterWorker'
import { db, soul, gun } from '../store/gun-db.js'
import { notify } from '../store/history.js'
import { generateItem } from './useItem'

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
              items[key].author.pub = userIs?.pub
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
    if (mode == 'private') {
      let userItem = gun
        .user()
        .get(type)
        .set(generateItem(type), (ack) => {
          if (ack.err) {
            console.error(ack)
          }
          if (root) {
            gun.get(root).get(type).set(userItem)
          }
          db.get(type).set(userItem)
        })
    }
    if (mode == 'public') {
      query.get(type).set(generateItem(type), (ack) => {
        if (ack.err) {
          console.error(ack)
        }
      })
    }
  }

  return {
    options,
    sorted,
    addItem,
  }
}
