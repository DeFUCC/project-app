import { reactive } from 'vue'
import { useSorter } from './sorter'
import { db, soul, gun, appPath } from '../store/gun-db'
import { user as currentUser } from '../store/user'

export function useItems({
  type = 'project',
  parent = null,
  user = null,
} = {}) {
  const items = reactive({})

  getItems()

  function getItems() {
    let query: any
    if (parent) {
      query = gun.get(parent)
    } else if (user) {
      query = gun.user(user).get(appPath)
    } else {
      query = db
    }
    query
      .get(type)
      .map()
      .on((data: any, key: string) => {
        if (!data) {
          return
        }
        if (items[key]) {
          items[key] = null
        }
        items[key] = { ...data }
        let item = items[key]
        item.soul = soul(data)
        item.rated = {
          star: {},
          seen: {},
          trash: {},
        }

        item.myRate = {
          star: false,
          seen: false,
          trash: false,
        }

        db.get('user')
          .map()
          .on((userData, userId) => {
            for (let rate in item.rated) {
              gun
                .user(userId)
                .get(appPath)
                .get('rate')
                .get(rate)
                .get(soul(data))
                .on((rated: any, rateType: string) => {
                  if (rated) {
                    item.rated[rate][userId] = true
                    if (userId == currentUser?.is?.pub) {
                      item.myRate[rate] = true
                    }
                  } else {
                    delete item.rated[rate][userId]
                    if (userId == currentUser?.is?.pub) {
                      item.myRate[rate] = false
                    }
                  }
                })
            }
          })
      })
  }

  const { sorted, options } = useSorter(items)

  return {
    options,
    sorted,
  }
}
