import { reactive, ref } from 'vue'
import { useSorter } from './sorter'
import { db, soul, gun, sea } from '../store/gun-db'
import { error, notify } from '../store/history'
import { createItem, generateItem } from './item'

export function useItems({ type = 'project', parent = null } = {}) {
  const items = reactive({})
  getItems()

  const { sorted, options } = useSorter(items)

  function getItems() {
    let query: any
    if (parent) {
      query = gun.get(parent)
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
          .user(items[key]?.createdBy)
          .on((userIs) => {
            if (userIs) {
              items[key].author.alias = userIs.alias
              items[key].author.pub = userIs.pub
            }
          })
          .get('profile')
          .get('avatar')
          .on((d: string) => {
            items[key].author.avatar = d
          })
      })
  }

  return {
    options,
    sorted,
  }
}
