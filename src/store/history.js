import { reactive, computed, watchEffect } from 'vue'

const evTypes = {
  app: 'app',
  info: 'info',
  error: 'error',
  warn: 'warn',
}

let story = []
if (localStorage.history) {
  try {
    story = JSON.parse(localStorage.history)
    story.forEach((line) => (line.seen = true))
  } catch (error) {
    localStorage.history = null
  }
}

export const history = reactive(story)

watchEffect(() => {
  localStorage.history = JSON.stringify(history)
})

export const unseen = computed(() => {
  return history.filter((ev) => !ev.seen)
})

export function notify(text) {
  addEvent('info', text)
}
export function warn(text) {
  addEvent('warn', text)
}

export function error(text) {
  addEvent('error', text)
}

export function clear() {
  history.splice(0)
}

export const eventColors = {
  app: '#eee',
  error: 'hsl(0, 60%, 58%)',
  info: 'hsl(110, 32%, 56%)',
  warn: 'hsl(41, 100%, 53%)',
}

function newEvent(type) {
  return {
    type: evTypes[type],
    time: Date.now(),
    seen: false,
  }
}

function addEvent(type, content, time = 5000) {
  const event = reactive({
    ...newEvent(type),
    content,
  })
  setTimeout(() => {
    event.seen = true
  }, time)
  history.push(event)
}
