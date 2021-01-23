export const model = {
  design: ['project'],
  project: ['event', 'object'],
  event: ['task', 'purchase'],
  object: ['task', 'purchase'],
  task: ['result'],
  purchase: ['thing'],
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
