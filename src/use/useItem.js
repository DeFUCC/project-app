import { gun, db, soul } from '../store/gun-db.js'
import { reactive, watchEffect, onActivated } from 'vue'
import { notify } from '../store/history.js'

export function useItem(id) {
  onActivated(() => {
    console.log('activated')
    findProject(id)
  })
  const edit = reactive({
    title: false,
  })
  const edited = reactive({
    title: '',
  })
  const project = reactive({})

  watchEffect(() => {
    findProject(id)
  })

  function findProject(pid) {
    db.get('project')
      .map((proj, key) => {
        if (proj.title == pid) {
          return proj
        }
        return
      })
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
        project[key] = null
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
  }
}
