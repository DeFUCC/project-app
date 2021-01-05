import { useRouter } from 'vue-router'
import { gun, db, appPath } from './gun-db'
import { notify, error } from './history'
import { reactive, watch } from 'vue'

export const user = reactive({
  is: null,
  profile: {
    createdAt: null,
    avatar: null,
  },
  info: {},
  rates: {},
})

gun.user().recall({ sessionStorage: true }, (ack: { err: string }) => {
  if (!ack.err) {
    logIn()
  } else {
    error("Couldn't recall a user")
  }
})

gun.on('auth', () => {
  loadUser(gun.user().is.pub)
})

export function loadUser(pub: string) {
  gun
    .user(pub)
    .get(appPath)
    .get('profile')
    .map()
    .on((data, key) => {
      user.profile[key] = data
    })
  db.get('user')
    .get(pub)
    .map()
    .on((data, key) => {
      user.info[key] = data
    })
  gun
    .user(pub)
    .get(appPath)
    .get('rate')
    .map()
    .on((data, key) => {
      user.rates[key] = data
    })
}

export function logIn() {
  user.is = gun.user().is
  loadUser(user.is.pub)
  notify('You successfully logged in as ' + user.is.alias + '.')
}

export function findUser(alias: string, cb: (data: any) => void) {
  gun.get('~@' + alias).once(cb)
}

export async function createUser(alias: string, pass: string) {
  console.log('creating')
  let newUser = gun.user().create(alias, pass, (ack) => {
    if (!ack.err) {
      let dbUser = db.get('user').get(ack.pub).put({
        alias: alias,
        pub: ack.pub,
        type: 'user',
        title: alias,
        description: ack.pub,
        createdAt: Date.now(),
      })
    } else {
      error(ack.err)
    }
    window.location.reload()
  })
}

export function authUser(alias, pass) {
  gun.user().auth(alias, pass, (ack) => {
    if (!ack.err) {
      logIn()
    } else {
      error(ack.err)
    }
  })
}

export function logOut() {
  gun.user().leave()
  setTimeout(() => {
    if (!gun.user()._?.sea) {
      user.is = null
      notify('User logged out')
      window.location.reload()
    }
  }, 300)
}
