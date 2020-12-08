import { gun, db, soul } from '../store/gun-db.js'
import { reactive, watchEffect, onActivated } from 'vue'
import { notify } from '../store/history.js'
import { generateWords } from './randomWords.js'

export function useItem(id) {
  console.log(id)
  const info = reactive({})
  const children = reactive({})
  gun
    .get(id)
    .map()
    .on((data, key) => {
      info[key] = data
    })
  async function addChild(type) {
    let added = await gun.get(id).get(type).set(generateItem(type))
    console.log(added)
  }
  gun
    .get(id)
    .get('project')
    .map()
    .on((data, key) => {
      children[key] = data
    })

  return { info, addChild, children }
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
