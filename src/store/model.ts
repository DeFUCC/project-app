declare global {
  interface Window {
    APPCONFIG: any
  }
}

const CONFIG = { ...window.APPCONFIG }

export const model = {
  all: Object.keys(CONFIG.model),
  ...CONFIG.model,
}

export const statuses = [
  'new',
  'dev',
  'process',
  'product',
  'pause',
  'ondemand',
  'finish',
]
