import { db, gun } from './../store/gun-db'
import { reactive } from 'vue'

export function useUsers() {
  const users = reactive({})
  db.get('user')
    .map()
    .on((data: any, key: string) => {
      users[key] = data
    })
  return {
    users,
  }
}
