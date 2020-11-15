const peerList = [
  //'https://gun-feeds.glitch.me/gun',
  'http://127.0.0.1:4200/gun',
]

export const gun = new Gun(peerList)
window.gun = gun //for debugging
const appPath = 'project-app'
export const db = gun.get(appPath)
export const soul = Gun.node.soul
export const isNode = Gun.node.is
export const getState = Gun.state

export function uuid(key) {
  return key.substring(key.lastIndexOf('/') + 1)
}

export function isLink(name, field) {
  return name != '_' && field instanceof Object && field.hasOwnProperty('#')
}
