export const items = {
  program: {
    fields: {
      title: 'string',
      idea: 'markdown',
    },
    links: {
      projects: {
        fields: {},
        links: {
          objects: {
            fields: {},
            links: {
              tasks: {},
            },
          },
          events: {
            fields: {},
            links: {},
          },
        },
      },
    },
  },
}

export const links = {}

export const model = {
  design: ['project'],
  project: ['event', 'object'],
  event: ['task', 'purchase'],
  object: ['task', 'purchase'],
}
