import { user } from './user'
import { computed, watchEffect, reactive } from 'vue'
import { gun, db, sea, genUuid, soul, appPath } from 'store@gun-db'
import { generateWords } from 'use@randomWords'
import { error, notify } from './history'

export function generateItem(type, data, parent) {
  const item = {
    ...data,
    ...{
      id: genUuid(),
      title: truncate(data.title) || generateWords(2),
      description: '',
      type: type,
      parent: parent || user?.is?.pub,
      status: 'new',
      createdAt: Date.now(),
      log: {
        [Date.now()]: 'created|' + data.title,
      },
    },
  }
  return item
}

export async function createItem(org, type, data, parent) {
  let generated = generateItem(type, data, parent)
  let path = org || appPath
  let privateItem = gun
    .user()
    .get(path)
    .get(type)
    .get(generated.id)
    .put(generated)
    .then()

  let publicItem = gun
    .get(org)
    .get(type)
    .get(generated.id)
    .put(await privateItem)

  if (parent) {
    gun
      .get(parent)
      .get(type)
      .get(generated.id)
      .put(await privateItem)
    gun
      .get(parent)
      .get('log')
      .get(Date.now())
      .put('added|' + generated.title)
  }
}

export async function linkItem(id, type, link) {
  console.log(`adding ${link} to ${type} in ${id}`)
}

export function truncate(input, num = 142) {
  if (!input) {
    return ' '
  }
  return input.length > num ? `${input.substring(0, num)}` : input
}

export function update(id, field, content) {
  const gunItem = gun.get(id)
  gunItem.get(field).put(content)
  gunItem.get('updatedAt').put(Date.now())
  gunItem
    .get('log')
    .get(Date.now())
    .put('edited|' + field)
  notify(`You updated ${field} with ${truncate(content)}.`)
}

export function isEditable(item) {
  if (!user.is) return
  let my = user.is?.pub == item?.soul.slice(1, 88)
  let me = item?.type == 'user' && user.is?.pub == item.pub
  let teammate = Boolean(item?.team[user.is?.pub])
  return my || me || teammate
}

export async function moveItem(type, id, to) {
  let movingGun = db.get(type).get(id)
  let parentId = await movingGun.get('parent').then()
  console.log(parentId)
}
