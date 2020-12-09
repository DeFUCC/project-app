import { reactive } from 'vue'

export function useViews({ item = 'design', type = 'feed' }) {
  const views = reactive([])
  views.length = 0
  views[0] = {
    type: type,
    root: 'frukt',
    item: item,
  }

  function openView(
    view = {
      type: 'feed',
      root: 'frukt',
      item: 'design',
    },
    num = 0,
  ) {
    view.type = view.type || 'item'
    console.log(view, num)
    views[num + 1] = view
    views.length = num + 2
  }

  function closeView(num) {
    if (num > 0) {
      views.splice(num, 1)
    }
  }

  return {
    views,
    openView,
    closeView,
  }
}
