import { toRefs, reactive } from 'vue'

export default function (url, options) {
  const state = reactive({
    page: [],
    error: null,
    fetching: true,
  })

  const fetchData = async () => {
    try {
      const res = await fetch(url, options)
      const json = await res.json()
      state.page = json
    } catch (errors) {
      state.error = error
    } finally {
      state.fetching = false
    }
  }
  fetchData()
  return { ...toRefs(state) }
}
