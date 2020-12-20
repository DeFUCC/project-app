import { reactive, computed, watchEffect } from 'vue'

type Events = 'app' | 'info' | 'error' | 'warn'

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
  } catch (err) {
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

export function notify(text: string): void {
  addEvent('info', text)
}
export function warn(text: string): void {
  addEvent('warn', text)
}

export function error(text: string): void {
  addEvent('error', text)
}

export function clear(): void {
  history.splice(0)
}

export const eventColors = {
  app: '#eee',
  error: 'hsl(0, 60%, 58%)',
  info: 'hsl(110, 32%, 56%)',
  warn: 'hsl(41, 100%, 53%)',
}

function newEvent(type: Events) {
  return {
    type: evTypes[type],
    time: Date.now(),
    seen: false,
  }
}

function addEvent(type: Events, content: string, time = 5000) {
  const event = reactive({
    ...newEvent(type),
    content,
  })
  setTimeout(() => {
    event.seen = true
  }, time)
  history.push(event)
}
