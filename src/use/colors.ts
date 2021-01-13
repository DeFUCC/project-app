import ColorHash from 'color-hash'
import { soul, isNode, uuid } from '../store/gun-db'

const color = new ColorHash({
  saturation: [0.12, 0.15, 0.2],
  lightness: [0.85, 0.9, 0.92],
})

export function itemColor(item: any): string {
  if (isNode(item)) {
    return color.hex(uuid(soul(item)))
  }
  if (item?.key) {
    return color.hex(uuid(item.key))
  }
  if (typeof item == 'string') {
    return color.hex(uuid(item))
  }
  return 'hsla(0,100%,100%,0.2)'
}
