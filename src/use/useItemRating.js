import { reactive, computed } from 'vue'
import { db, gun } from '../store/gun-db.js'

export function useItemRating(id) {
  if (!id) {
    console.error('no id for rating')
    return
  }
  const rating = reactive({
    item: id,
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

  db.get('user')
    .map()
    .once((data, key) => {
      gun
        .user(key)
        .get('rating')
        .get(id)
        .on((d, k) => {
          if (k == id && d) {
            rating.plused[key] = true
          }
        })
    })

  const rate = {
    plus() {
      gun.user().get('rating').get(id).put(true)
    },
    minus() {
      gun.user().get('rating').get(id).put(false)
    },
  }

  return {
    rating,
    rate,
  }
}
