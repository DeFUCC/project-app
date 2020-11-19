import { reactive, computed } from 'vue'
import { db, gun } from '../store/gun-db.js'
import { user } from '../use/useUser.js'

export function useItemRating(id) {
  if (!id) {
    console.error('no id for rating')
    return
  }
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

  db.get('users')
    .map()
    .on((data, key) => {
      getUserRating({
        userId: key,
        item: id,
      })
    })

  function getUserRating({ userId, item } = {}) {
    let userProfile
    gun
      .user(userId)
      .get('profile')
      .once((data, key) => {
        userProfile = data
      })
      .back()
      .get('rating')
      .get(item)
      .on((d, k) => {
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
      let current
      gun
        .user()
        .get('rating')
        .get(id)
        .once((val) => {
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
