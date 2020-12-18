import { gun } from '../store/gun-db.js'
import { reactive } from 'vue'
import { generateWords } from '../tools/randomWords'

export function useItem(id : string) {
  const info = reactive({})
  gun
    .get(id)
    .map()
    .on((data: any, key: string) => {
      info[key] = data
    })
  return { info }
}

export function generateItem(type:string):Item {
  return {
    title: generateWords(2),
    description: generateWords(100),
    type: type,
    createdAt: Date.now(),
    createdBy: gun.user()?.is?.pub,
  }
}

export interface Item {
  title: string,
  description: string,
  type: string,
  createdAt: number,
  createdBy: string,
}