import { reactive } from 'vue'

export const views = reactive([
  {
    type: 'feed',
    root: 'frukt',
    item: 'design',
    id: null,
  },
])

export function openView(
  view = {
    type: 'feed',
    root: 'frukt',
    item: 'design',
  },
) {
  let currentView = views[views.length - 1]
  view.type = view.type || 'item'
  // console.log(view, views)
  if (currentView?.type == view?.type) {
    views[views.length - 1] = view
  } else {
    views.push(view)
  }
}

export function closeView(num) {
  if (num > 0) {
    views.splice(num, 1)
  }
}
