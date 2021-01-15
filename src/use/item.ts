import { user } from './../store/user'
import { computed, watchEffect, reactive } from 'vue'
import { gun, db, sea, genUuid, soul, appPath } from '../store/gun-db'
import { generateWords } from '../use/randomWords'
import { error, notify } from '../store/history'

export interface Item {
  title: string
  description: string
  type: string
  parent: string
  createdAt: number
  createdBy: string
}

function generateDescription() {
  return `${generateWords(2, 6)}
  ----
  ${generateWords(30, 50)}
  
  ${generateWords(1, 10)}
  ====

  - ${generateWords(1, 10)}
  - ${generateWords(1, 10)}
  - ${generateWords(1, 10)}

  ${generateWords(1, 10)}
  ====
  
  ${generateWords(10, 80)}`
}

export function generateItem(type: string, data?: any, parent?: string): Item {
  const item = { ...data }
  Object.assign(item, {
    title: truncate(data.title) || generateWords(2),
    description: '',
    type: type,
    parent: parent || user?.is?.pub,
    status: 'new',
    createdAt: Date.now(),
    log: {
      [Date.now()]: 'created|' + data.title,
    },
  })
  return item
}

export async function createItem(type: string, data?: any, parent?: string) {
  let generated = generateItem(type, data, parent)

  let id = genUuid()
  let privateItem = gun.user().get(appPath).get(type).get(id).put(generated)

  let publicItem = db
    .get(type)
    .get(id)
    .put(await privateItem)

  if (parent) {
    gun
      .get(parent)
      .get(type)
      .get(id)
      .put(await privateItem)
    gun
      .get(parent)
      .get('log')
      .get(Date.now())
      .put('added|' + generated.title)
  }
}

export function truncate(input: string, num = 42) {
  if (!input) {
    return ' '
  }
  return input.length > num ? `${input.substring(0, num)}` : input
}

export function update(id: string, field: string, content: string) {
  const gunItem = gun.get(id)
  gunItem.get(field).put(content)
  gunItem.get('updatedAt').put(Date.now())
  gunItem
    .get('log')
    .get(Date.now())
    .put('edited|' + field)
  notify(`You updated ${field} with ${truncate(content)}.`)
}
