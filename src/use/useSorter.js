import { ref } from 'vue'
export function useSorter() {
  if (!window.Worker) {
    console.log('No worker support')
    return
  }
  const sorted = ref({})
  const sorter = new Worker('./src/workers/sorter.js')
  sorter.onmessage = (e) => {
    sorted.value = e.data
  }
  function sort(list) {
    sorter.postMessage(list)
  }
  return {
    sort,
    sorted,
  }
}
