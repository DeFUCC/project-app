export interface Item {
  title: string
  description: string
  type: string
  createdAt: number
  createdBy: string
}

export interface Design extends Item {
  projects: object
}

enum Types {
  design = 'design',
  project = 'project',
  event = 'event',
}

export const types = [
  'user',
  'design',
  'project',
  'object',
  'event',
  'task',
  'purchase',
  'result',
  'thing',
]

export const model = {
  all: [
    'user',
    'design',
    'project',
    'object',
    'event',
    'task',
    'purchase',
    'result',
    'thing',
  ],
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

export const statuses = {
  new: 'New',
  dev: 'Development',
  process: 'Process',
  product: 'Product',
  pause: 'Paused',
  ondemand: 'On demand',
  finish: 'Finished',
}
