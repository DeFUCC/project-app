import { reactive, toRaw } from 'vue'
import { db, gun } from '../store/gun-db.js'

export function useItemRating(id) {
  if (!id) {
    console.error('no id for rating')
    return
  }
  console.log(id)
  const rating = reactive({
    item: id,
    count: 0,
    minus: 0,
    zero: 0,
    plus: 0,
  })

  db.get('rating')
    .get(id)
    .map()
    .on((data, key) => {
      rating[key] = data
    })

  const rate = {
    plus() {
      console.log('plused', id)
      db.get('rating')
        .get(id)
        .get('plus')
        .put(rating.plus + 1)
      // gun.user().get('rating').get('plus').put(true)
    },
  }

  return {
    rating,
    rate,
  }
}
