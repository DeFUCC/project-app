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
      .on((data: any, key: string) => {
        if (items[key]) {
          items[key] = null
        }
        items[key] = data
        items[key].soul = soul(data)
      })
  }

  return {
    options,
    sorted,
  }
}
