export const model = {
  design: ['project'],
  project: ['opportunity', 'event', 'object'],
  event: ['opportunity', 'task', 'purchase'],
  object: ['opportunity', 'task', 'purchase'],
  task: ['result'],
  purchase: ['thing'],
  opportunity: [],
  result: [],
  thing: [],
}

export const types = Object.keys(model)

export const statuses = [
  'new',
  'dev',
  'process',
  'product',
  'pause',
  'ondemand',
  'finish',
]
