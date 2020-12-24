import { reactive } from 'vue'
import { useSorter } from './sorter'
import { db, soul, gun } from '../store/gun-db'

export function useItems({
  type = 'project',
  parent = null,
  user = null,
} = {}) {
  const items = reactive({})

  const { sorted, options } = useSorter(items)

  getItems()

  function getItems() {
    let query: any
    if (parent) {
      query = gun.get(parent)
    } else if (user) {
      query = gun.user(user)
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
        let item = items[key]
        item.soul = soul(data)
        item.rated = {
          star: {},
          seen: {},
          trash: {},
        }
        db.get('user')
          .map()
          .on((userData, userId) => {
            for (let rate in item.rated) {
              gun
                .user(userId)
                .get('rate')
                .get(rate)
                .get(soul(data))
                .on((rated: any, rateType: string) => {
                  if (rated) {
                    item.rated[rate][userId] = true
                  } else {
                    delete item.rated[rate][userId]
                  }
                })
            }
          })
      })
  }

  return {
    options,
    sorted,
  }
}
