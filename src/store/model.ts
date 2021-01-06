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
]

export const model = {
  all: ['user', 'design', 'project', 'object', 'event', 'task', 'purchase'],
  user: ['design', 'project', 'object', 'event', 'task', 'purchase'],
  design: ['project'],
  project: ['event', 'object'],
  event: ['task', 'purchase'],
  object: ['task', 'purchase'],
  task: [],
  purchase: [],
}

export const statuses = {
  new: 'New',
  dev: 'Development',
  process: 'Process',
  pause: 'Paused',
  ondemand: 'On demand',
  finish: 'Finished',
}
