import { computed, reactive } from 'vue'
import { gun } from '../store/gun-db'

export function useCount(id: string, type: string) {
  const items = reactive({})
  gun
    .get(id)
    .get(type)
    .map()
    .on((data: any, key: string) => {
      items[key] = data
    })
  const count = computed(() => Object.keys(items).length)
  return {
    count,
  }
}
