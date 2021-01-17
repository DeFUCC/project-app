window.APPCONFIG = {
  appPath: 'feeds-app',
  dbVersion: 24,
  peers: ['http://127.0.0.1:4200/gun', 'https://gun-feeds.glitch.me/gun'],
  model: {
    user: ['design', 'project', 'object', 'event', 'task', 'purchase'],
    design: ['project'],
    project: ['object', 'event'],
    event: ['task', 'purchase'],
    object: ['task', 'purchase'],
    task: ['result'],
    purchase: ['thing'],
    result: [],
    thing: [],
  },
}
