import { reactive, watch } from 'vue'
import { useSorter } from './sorter'
import { db, soul, gun, appPath } from '../store/gun-db'
import { user } from '../store/user'

export function useItems({ type = 'project', parent = null } = {}) {
  const items = reactive({})
  const team = reactive({})
  getItems()

  function getItems() {
    let query: any
    if (parent) {
      query = gun.get(parent)
    } else {
      query = db
    }
    query.get(type).map().on(loadItem)

    if (parent) {
      gun
        .get(parent)
        .get('team')
        .map()
        .on((data, key) => {
          team[key] = data
        })
    }
    watch(team, () => {
      for (let member in team) {
        console.info(
          'very basic team work is in development here. Need to figure out the rights to check add feature. Fow now all items of teammates are loaded for demo purposes. Then they will be filtered by parent - need to make the parent changing work first',
        )
        if (team[member]) {
          gun.user(member).get(appPath).get(type).map().on(loadItem)
        }
      }
    })

    function loadItem(data: any, key: string) {
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
                  if (userId == user?.is?.pub) {
                    item.myRate[rate] = true
                  }
                } else {
                  delete item.rated[rate][userId]
                  if (userId == user?.is?.pub) {
                    item.myRate[rate] = false
                  }
                }
              })
          }
        })
    }
  }

  const { sorted, options } = useSorter(items)

  return {
    options,
    sorted,
  }
}
