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

export const organisations = {
  'feeds-app': {
    title: 'Open feeds',
    subtitle: '',
    description: 'First clean run of frukt in the app',
    model,
  },
  'project-app': {
    title: 'Project app',
    subtitle: 'One of dirty runs of previous versions of the app',
    description: 'may be very buggy!',
    model: {
      design: ['project'],
      project: ['design'],
    },
  },
}
