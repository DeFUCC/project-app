import { user } from './../store/user'
import { computed, watchEffect, reactive } from 'vue'
import { gun, db, sea, soul, appPath } from '../store/gun-db'
import { generateWords } from '../tools/randomWords'
import { error, notify } from '../store/history'

export function useItem(id: string) {
  const item = reactive({
    soul: id,
    title: null,
    type: 'design',
    pub: null,
  })

  gun
    .get(id)
    .map()
    .on((data: any, key: string) => {
      item[key] = data
    })

  const edit = reactive({
    icon: false,
    title: false,
    description: false,
  })

  function update(field: string, content: string) {
    gun.get(id).get(field).put(content)
    let now = new Date()
    gun.get(id).get('updatedAt').put(Date.now())
    gun
      .get(id)
      .get('log')
      .get(Date.now())
      .put('edited|' + field)
    edit[field] = false
    notify(`You updated ${field} of ${item.title} with ${truncate(content)}.`)
  }

  const editable = computed(() => {
    return (
      user.is &&
      (user.is.pub == id.slice(1, 88) ||
        (item.type == 'user' && user.is.pub == item.pub))
    )
  })

  return { item, edit, update, editable }
}

export interface Item {
  title: string
  description: string
  type: string
  parent: string
  createdAt: number
  createdBy: string
}

export function generateItem(type: string, data?: any, parent?: string): Item {
  const item = { ...data }
  Object.assign(item, {
    title: truncate(data.title) || generateWords(2),
    description: data.description || generateWords(100),
    type: type,
    parent: parent || null,
    createdAt: Date.now(),
    log: {
      [Date.now()]: 'created|' + data.title,
    },
  })
  return item
}

export async function createItem(type: string, data?: any, parent?: string) {
  let generated = generateItem(type, data, parent)

  try {
    let privateItem = gun.user().get(appPath).get(type).set(generated)
    let uuid = soul(await privateItem).slice(-15)
    let publicItem = await db.get(type).get(uuid).put(privateItem)
    if (parent) {
      gun.get(parent).get(type).get(uuid).put(privateItem)
      gun
        .get(parent)
        .get('log')
        .get(Date.now())
        .put('added|' + generated.title)
    }
    return soul(publicItem)
  } catch (err) {
    console.error(err)
  }
}

export function truncate(input: string, num = 24) {
  if (!input) {
    return ' '
  }
  return input.length > num ? `${input.substring(0, num)}...` : input
}
