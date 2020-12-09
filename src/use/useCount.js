import { computed, reactive } from 'vue'
import { gun } from '../store/gun-db.js'

export function useCount(id = 'frukt', type = 'design') {
  const items = reactive({})
  gun
    .get(id)
    .get(type)
    .map()
    .on((data, key) => {
      items[key] = data
    })
  const count = computed(() => Object.keys(items).length)
  return {
    count,
  }
}
