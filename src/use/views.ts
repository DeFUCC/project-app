import { reactive } from 'vue'

interface ViewParams {
  item: string
  type: string
}

interface View {
  type: string
  id: string
  root?: string
}

export function useViews(starter: ViewParams) {
  const views = reactive([])

  function openView(view: View, num: number) {
    views[num + 1] = view
    views.splice(num + 2)
  }

  function closeView(num: number) {
    views.splice(num, 1)
  }

  return {
    views,
    openView,
    closeView,
  }
}
