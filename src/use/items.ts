import { reactive, ref } from 'vue'
import { useSorter } from './sorterWorker'
import { db, soul, gun, sea } from '../store/gun-db'
import { error, notify } from '../store/history'
import { generateItem } from './item'

export function useItems({ type = 'project', root = null } = {}) {
  const items = reactive({})
  const adding = ref(false)
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
    adding.value = true
    let item = generateItem(type)
    try {
      let privateItem = await gun.user().get(type).set(item)
      let hash = await sea.work(privateItem, privateItem.createdAt, null, {
        name: 'sha-1',
        encode: 'hex',
      })
      let publicItem = await db.get(type).get(hash).put(privateItem)
      if (root) {
        gun.get(root).get(type).get(hash).put(privateItem)
      }
    } catch (err) {
      error(err)
    }
    adding.value = false
  }

  return {
    options,
    sorted,
    addItem,
    adding,
  }
}
