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
  design: ['project'],
  project: ['event', 'object'],
  event: ['task', 'purchase'],
  object: ['task', 'purchase'],
}
