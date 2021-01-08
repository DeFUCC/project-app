declare global {
  interface Window {
    Gun: any
    SEA: any
    gun: any
  }
}
// @ts-ignore
import CONFIG from '../app.config.json'

console.log(CONFIG)

const peerList = [...CONFIG.peers]

checkDbVersion(localStorage.dbVersion, CONFIG.dbVersion)

export const gun = window.Gun(peerList)
window.gun = gun //for debugging
export const appPath = CONFIG.appPath
export const db = gun.get(appPath)
export const soul = window.Gun.node.soul
export const isNode = window.Gun.node.is
export const getState = window.Gun.state.is //(node,'key') => timestamp
export const sea = window.SEA
export const genUuid = window.Gun.text.random

export function uuid(key: string): string {
  return key.substring(key.lastIndexOf('/') + 1)
}

export function isLink(name: string, field: object): boolean {
  return name != '_' && field instanceof Object && field.hasOwnProperty('#')
}

function checkDbVersion(local: number, current: number) {
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
