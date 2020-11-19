import { reactive } from 'vue'
import { generateWords } from './randomWords.js'
import { useSorter } from './useSorterWorker.js'
import { db, soul, gun } from '../store/gun-db.js'
import { notify } from '../store/history.js'
import { itemColor } from '../use/colors.js'

export function useItems({ type = 'project' } = {}) {
  const items = reactive({})

  const { sorted, options } = useSorter(items)

  function getItems() {
    db.get(type)
      .map()
      .on((data, key) => {
        if (items[key]) {
          items[key] = null
        }
        items[key] = data
        items[key].soul = soul(data)
        items[key].author = {}
        gun
          .user(key.substring(1, 88))
          .get('profile')
          .get('avatar')
          .on((d) => {
            items[key].author.avatar = d
          })

        if (data.createdBy) {
          db.get('users')
            .get(data.createdBy)
            .once((d, k) => {
              items[key].author.alias = d?.alias
            })
        }
      })
  }

  getItems()

  function addItem() {
    let title = generateWords(2).join(' ')
    let userItem = gun
      .user()
      .get(type)
      .set(
        {
          title,
          createdAt: Date.now(),
          createdBy: gun.user()?.is?.pub,
        },
        (ack) => {
          if (!ack.err) {
            notify(`${type} ${title} has been added`)
          }
          db.get(type).set(userItem)
        },
      )
  }

  return {
    items,
    options,
    sorted,
    addItem,
  }
}
