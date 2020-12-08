import { gun } from '../store/gun-db.js'
import { reactive } from 'vue'
import { notify } from '../store/history.js'
import { generateWords } from './randomWords.js'

export function useItem(id) {
  const info = reactive({})
  gun
    .get(id)
    .map()
    .on((data, key) => {
      info[key] = data
    })

  return { info }
}

export function generateItem(type) {
  return {
    title: generateWords(2).join(' '),
    description: generateWords(100).join(' '),
    type: type,
    createdAt: Date.now(),
    createdBy: gun.user()?.is?.pub,
  }
}
