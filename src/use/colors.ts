import ColorHash from 'color-hash'
import { soul, isNode, uuid } from '../store/gun-db'

const color = new ColorHash({
  saturation: [0.12, 0.15, 0.2],
  lightness: [0.85, 0.87, 0.9],
})

const deepColor = new ColorHash({
  saturation: [0.3, 0.4, 0.5],
  lightness: [0.7, 0.8, 0.9],
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

export function pubGradient(pub, angle = 0) {
  if (!pub) return
  let sp = pub.split('.')
  let duo = sp.map((s) => deepColor.hex(s))
  return `linear-gradient(${angle}deg, ${duo[0]} 0%, ${duo[1]} 100%)`
}
