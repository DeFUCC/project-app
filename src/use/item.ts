import { gun, db, sea } from '../store/gun-db'
import { reactive } from 'vue'
import { generateWords } from '../tools/randomWords'
import { error } from '../store/history'

export function useItem(id: string) {
  const info = reactive({})
  gun
    .get(id)
    .map()
    .on((data: any, key: string) => {
      info[key] = data
    })
  return { info }
}

export function generateItem(type: string, title?: string): Item {
  return {
    title: title || generateWords(2),
    description: generateWords(100),
    type: type,
    createdAt: Date.now(),
    createdBy: gun.user()?.is?.pub,
  }
}

export interface Item {
  title: string
  description: string
  type: string
  createdAt: number
  createdBy: string
}

export async function createItem(type: string, data?: any, parent?: string) {
  let item = generateItem(type, data?.title)
  try {
    let privateItem = await gun.user().get(type).set(item)
    let hash = await sea.work(privateItem, privateItem.createdAt, null, {
      name: 'sha-1',
      encode: 'hex',
    })
    let publicItem = await db.get(type).get(hash).put(privateItem)
    if (parent) {
      gun.get(parent).get(type).get(hash).put(privateItem)
    }
  } catch (err) {
    error(err)
  }
}
