import { user } from './../store/user'
import { computed, watchEffect, reactive } from 'vue'
import { gun, db, sea, genUuid, soul, appPath } from '../store/gun-db'
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
    description: data.description || generateDescription(),
    type: type,
    parent: parent || null,
    status: 'new',
    createdAt: Date.now(),
    log: {
      [Date.now()]: 'created|' + data.title,
    },
  })
  return item
}

export function createItem(type: string, data?: any, parent?: string) {
  let generated = generateItem(type, data, parent)
  let id = genUuid()
  let publicItem
  let privateItem = gun
    .user()
    .get(appPath)
    .get(type)
    .set(generated, function (ack) {
      if (!ack.err) {
        publicItem = db.get(type).get(id).put(privateItem)
        if (parent) {
          gun.get(parent).get(type).get(id).put(privateItem)
          gun
            .get(parent)
            .get('log')
            .get(Date.now())
            .put('added|' + generated.title)
        }
      }
    })
}

export function truncate(input: string, num = 42) {
  if (!input) {
    return ' '
  }
  return input.length > num ? `${input.substring(0, num)}...` : input
}
