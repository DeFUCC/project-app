import { reactive, watchEffect } from 'vue'
import { gun, db, soul } from '../store/gun-db.js'
import { notify } from '../store/history.js'
import { itemColor } from '../use/colors.js'

export function useItem() {
  const edit = reactive({
    title: false,
  })
  const edited = reactive({
    title: '',
  })
  const project = reactive({})

  watchEffect(() => {
    sync('project', id)
  })

  function sync(itemType, title) {
    db.get('project')
      .get(id)
      .on((data, key) => {
        getProject(soul(data))
      })
  }

  function getProject(pid) {
    project.soul = pid
    gun
      .get(pid)
      .map()
      .on((data, key) => {
        project[key] = data
      })
  }

  function update() {
    if (!edited.title) {
      edit.title = false
      return
    }
    let title = project.title
    gun.get(project.soul).put(
      {
        title: edited.title,
        updatedAt: Date.now(),
      },
      () => {
        notify(`Project ${title} is renamed to ${edited.title}`)
        edited.title = ''
        edit.title = false
      },
    )
  }
  return {
    update,
    project,
    edit,
    edited,
    itemColor,
  }
}
