import { gun, soul, db } from './../store/gun-db'
import { reactive } from 'vue'
import { useSorter } from './sorter'

export function useItems(type: string, parent?: string) {
  const items = reactive({})
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
      if (data === null) {
        items[key] = null
        return
      }
      items[key] = { ...data }
      items[key].soul = soul(data)
      items[key].id = key
    })

  return useSorter(items)
}
