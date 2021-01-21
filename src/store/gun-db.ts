declare global {
  interface Window {
    Gun: any
    SEA: any
    gun: any
  }
}

const config = {
  appPath: 'feeds-app',
  dbVersion: 24,
  peers: ['http://127.0.0.1:4200/gun', 'https://gun-feeds.glitch.me/gun'],
}

checkDbVersion(localStorage.dbVersion, config.dbVersion)

export const gun = window.Gun(config.peers)
window.gun = gun //for debugging
export const appPath = config.appPath
export const db = gun.get(appPath)
export const soul = window.Gun.node.soul
export const isNode = window.Gun.node.is
export const getState = window.Gun.state.is //(node,'key') => timestamp
export const sea = window.SEA
export const genUuid = window.Gun.text.random

export async function getShortHash(text) {
  return await sea.work(text, appPath, null, { name: 'SHA-1', encode: 'hex' })
}

export function cutUuid(key: string): string {
  if (!key) return
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
