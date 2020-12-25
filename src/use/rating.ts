import { isNode } from './../store/gun-db'
import { reactive, computed, ref } from 'vue'
import { db, gun, soul } from '../store/gun-db'
import { user } from '../store/user'

type RateType = 'star' | 'seen' | 'trash'

const types = ['star', 'seen', 'trash']

export function useItemRating(id: string) {
  const rating = reactive({
    item: id,
    star: {},
    seen: {},
    trash: {},
  })

  const myRate = reactive({
    star: false,
    seen: false,
    trash: false,
  })

  const count = reactive({
    all: computed(() => {
      let sum = count.seen + count.star + count.trash
      return sum
    }),
    seen: computed(() => {
      return Object.keys(rating.seen).length
    }),
    star: computed(() => {
      return Object.keys(rating.star).length
    }),
    trash: computed(() => {
      return Object.keys(rating.trash).length
    }),
  })

  if (user.is) {
    types.forEach((type) => {
      gun
        .user()
        .get('rate')
        .get(type)
        .map()
        .on((data, key) => {
          if (key == id) {
            myRate[type] = Boolean(soul(data))
          }
        })
    })
  }

  db.get('user')
    .map()
    .on((data: any, key: string) => {
      getUserRating(key)
    })

  function getUserRating(userId: string) {
    let userProfile: any
    const userRating = gun
      .user(userId)
      .once((d) => {
        userProfile = d
      })
      .get('rate')
    types.forEach((type) => {
      userRating
        .get(type)
        .get(id)
        .on((data: any, key: string) => {
          if (key == id) {
            if (data) {
              rating[type][userId] = userProfile
            } else {
              delete rating[type][userId]
            }
          }
        })
    })
  }

  function rate(type: RateType): void {
    if (!user.is) return
    let current: any
    let item = gun.get(id)
    gun
      .user()
      .get('rate')
      .get(type)
      .get(id)
      .once(function (data) {
        if (!data) {
          this.put(item)
        } else {
          this.put(null)
        }
      })
  }

  return {
    myRate,
    count,
    rate,
  }
}
