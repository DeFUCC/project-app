import { gun, db, sea, soul, appPath } from '../store/gun-db'
import { reactive } from 'vue'
import { generateWords } from '../tools/randomWords'
import { error } from '../store/history'

export function useItem(id: string) {
  const item = reactive({
    soul: null,
  })
  gun
    .get(id)
    .map()
    .on((data: any, key: string) => {
      item[key] = data
      item.soul = id
    })
  return item
}

export function generateItem(type: string, data?: any, parent?: string): Item {
  return {
    title: data.title || generateWords(2),
    description: data.description || generateWords(100),
    type: type,
    parent: parent,
    createdAt: Date.now(),
    createdBy: gun.user()?.is?.pub,
    ...data,
  }
}

export interface Item {
  title: string
  description: string
  type: string
  parent: string
  createdAt: number
  createdBy: string
}

export async function createItem(type: string, data?: any, parent?: string) {
  let item = generateItem(type, data, parent)

  try {
    let privateItem = await gun.user().get(appPath).get(type).set(item)
    let uuid = soul(privateItem).slice(-15)
    let publicItem = await db.get(type).get(uuid).put(privateItem)
    if (parent) {
      gun.get(parent).get(type).get(uuid).put(privateItem)
    }
    return soul(publicItem)
  } catch (err) {
    error(err)
  }
}
