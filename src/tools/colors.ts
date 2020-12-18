import ColorHash from 'color-hash'
import { soul, isNode, uuid } from '../store/gun-db.js'

const color = new ColorHash({
  saturation: [0.1, 0.2, 0.2],
  lightness: [0.75, 0.85, 0.9],
})

export function itemColor(item:any):string {
  if (isNode(item)) {
    return color.hex(uuid(soul(item)))
  }
  if (item?.key) {
    return color.hex(uuid(item.key))
  }
  if (typeof item == 'string') {
    return color.hex(uuid(item))
  }
  return '#ccc'
}
