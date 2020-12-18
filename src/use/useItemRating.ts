import { reactive, computed } from 'vue'
import { db, gun } from '../store/gun-db.js'
import { user } from './useUser.js'

export function useItemRating(id:string) {

  const rating = reactive({
    item: id,
    myRate: null,
    count: {
      all: 0,
      minus: 0,
      zero: 0,
      plus: computed(() => {
        return Object.keys(rating.plused).length
      }),
    },
    plused: {},
    minused: {},
    zeroed: {},
  })
  if (user.isLoggedIn) {
    gun
      .user()
      .get('rating')
      .get(id)
      .on((data, key) => {
        rating.myRate = data
      })
  }

  db.get('user')
    .map()
    .on((data:any, key:string) => {
      getUserRating(key,id)
    })

  function getUserRating(userId:string, itemId:string) {
    let userProfile: any
    gun
      .user(userId)
      .get('profile')
      .once((data:any, key:string) => {
        userProfile = data
      })
      .back()
      .get('rating')
      .get(itemId)
      .on((d:any, k:string) => {
        if (k == id) {
          if (d) {
            rating.plused[userId] = userProfile
          } else {
            delete rating.plused[userId]
          }
        }
      })
  }

  const rate = {
    plus() {
      if (!user.is) return
      let current : boolean
      gun
        .user()
        .get('rating')
        .get(id)
        .once((val:boolean) => {
          current = val
        })
        .put(!current)
    },
    minus() {
      if (!user.is) return
      gun.user().get('rating').get(id).put(false)
    },
  }

  return {
    rating,
    rate,
  }
}
