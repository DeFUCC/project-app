const config = {
  appPath: 'feeds-app',
  dbVersion: 24,
  peers: ['https://etogun.glitch.me/gun'],
}

//@ts-ignore
import Gun from 'gun/gun'
//@ts-ignore
import SEA from 'gun/sea.js'
import 'gun/lib/then'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
import 'gun/lib/webrtc'
import 'gun/nts'

checkDbVersion(localStorage.dbVersion, config.dbVersion)

export const gun = Gun(config.peers)
window.gun = gun //for debugging
export const appPath = config.appPath
export const db = gun.get(appPath)
export const soul = Gun.node.soul
export const isNode = Gun.node.is
//@ts-ignore
export const getState = Gun.state.is //(node,'key') => timestamp
export const sea = SEA
//@ts-ignore
export const genUuid = Gun.text.random

export async function getShortHash(text) {
  return await sea.work(text, appPath, null, { name: 'SHA-1', encode: 'hex' })
}

export function cutUuid(key) {
  if (!key) return
  return key.substring(key.lastIndexOf('/') + 1)
}

export function isLink(name, field) {
  return name != '_' && field instanceof Object && field.hasOwnProperty('#')
}

function checkDbVersion(local, current) {
  if (!local) {
    localStorage.dbVersion = current
    console.log('DB version is now ' + local)
  } else if (local < current) {
    console.error(
      `New DB version ${current} detected. Clearing local database.`,
    )
    localStorage.clear()
    localStorage.dbVersion = current
  } else {
    console.info('DB version: ' + local)
  }
}
