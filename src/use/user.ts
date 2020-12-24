import { gun } from './../store/gun-db'
import { reactive } from 'vue'

export function useUserProfile(id: string) {
  const profile = reactive({
    avatar: null,
    alias: null,
    pub: null,
  })

  if (id) {
    gun
      .user(id)
      .on((userIs: any) => {
        if (userIs) {
          profile.alias = userIs.alias
          profile.pub = userIs.pub
        }
      })
      .get('profile')
      .get('avatar')
      .on((d: string) => {
        profile.avatar = d
      })
  }

  return profile
}
