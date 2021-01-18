const modelGraph = {
  user: ['design', 'project', 'object', 'event', 'task', 'purchase'],
  design: ['project'],
  project: ['object', 'event'],
  event: ['task', 'purchase'],
  object: ['task', 'purchase'],
  task: ['result'],
  purchase: ['thing'],
  result: [],
  thing: [],
}

export const model = {
  all: Object.keys(modelGraph),
  ...modelGraph,
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
