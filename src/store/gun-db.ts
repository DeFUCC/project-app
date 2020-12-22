declare global {
  interface Window {
    Gun: any
    SEA: any
    gun: any
  }
}

const peerList = [
  //'https://gun-feeds.glitch.me/gun',
  // 'http://127.0.0.1:4200/gun',
]

export const gun = new window.Gun(peerList)
window.gun = gun //for debugging
const appPath = 'project-app'
export const db = gun.get(appPath)
export const soul = window.Gun.node.soul
export const isNode = window.Gun.node.is
export const getState = window.Gun.state
export const sea = window.SEA

export function uuid(key: string): string {
  return key.substring(key.lastIndexOf('/') + 1)
}

export function isLink(name: string, field: object): boolean {
  return name != '_' && field instanceof Object && field.hasOwnProperty('#')
}
