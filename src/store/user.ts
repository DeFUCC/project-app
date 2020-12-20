import { gun, db } from './gun-db'
import { notify, error } from './history'
import { reactive } from 'vue'

export const user = reactive({
  isLoggedIn: false,
  is: null,
  profile: {
    createdAt: null,
    avatar: null,
  },
  info: {},
  rating: {},
})

gun.user().recall({ sessionStorage: true }, (ack: { err: string }) => {
  console.log('recalling')
  if (!ack.err) {
    logIn()
    console.log('recalling')
  } else {
    error("Couldn't recall a user")
  }
})

gun.on('auth', () => {
  console.log('authed')
  loadUser(user, gun.user().is.pub)
})

export function loadUser(
  container = {
    profile: {},
    info: {},
    rating: {},
  },
  pub: string,
) {
  console.log('loading')
  gun
    .user(pub)
    .get('profile')
    .map()
    .on((data, key) => {
      container.profile[key] = data
    })
  db.get('user')
    .get(pub)
    .map()
    .on((data, key) => {
      container.info[key] = data
    })
  gun
    .user(pub)
    .get('rating')
    .map()
    .on((data, key) => {
      container.rating[key] = data
    })
}

export function logIn() {
  user.isLoggedIn = true
  user.is = gun.user().is
  loadUser(user, gun.user().is.pub)
  console.log('logging in', user.is)
  notify('You successfully logged in as ' + user.is.alias + '.')
}

export function findUser(alias: string, cb: (data: any) => void) {
  gun.get('~@' + alias).once(cb)
}

export async function createUser(alias: string, pass: string) {
  let exists = await gun.get('~@' + alias)
  if (exists) {
    error('user already exists!')
    return
  }
  let newUser = await gun.user().create(alias, pass, (ack) => {
    if (!ack.err) {
      let dbUser = db.get('user').get(ack.pub).put({
        alias: alias,
        pub: ack.pub,
        createdAt: Date.now(),
      })
      logIn()
    }
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
      user.isLoggedIn = false
      user.is = null
      notify('User logged out')
      window.location.reload()
    }
  }, 300)
}
