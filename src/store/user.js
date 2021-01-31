import { gun, db, appPath, getShortHash } from './gun-db'
import { notify, error } from './history'
import { reactive, watch } from 'vue'

export const user = reactive({
  is: null,
  profile: {
    title: '',
  },
  rates: {},
})

export function isMine(soul) {
  if (!soul) return
  return soul.slice(1, 88) == user.is?.pub
}

gun.user().recall({ sessionStorage: true }, (ack) => {
  if (!ack.err) {
    logIn()
  } else {
    error("Couldn't recall a user")
  }
})

gun.on('auth', async () => {
  console.log('auth')
  loadUser(gun.user().is.pub)
})

export function loadUser(pub) {
  gun
    .user(pub)
    .get(appPath)
    .get('profile')
    .map()
    .on((data, key) => {
      user.profile[key] = data
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

export function findUser(alias, cb) {
  gun.get('~@' + alias).once((val) => {
    cb(val)
  })
}

function generateUser(alias, pub) {
  return {
    alias: alias,
    title: alias,
    pub: pub,
    createdAt: Date.now(),
  }
}

export function createUser(alias, pass) {
  console.log('creating')
  findUser(alias, (val) => {
    console.log(val)
  })
  gun.user().create(alias, pass, async (ack) => {
    if (!ack.err) {
      let id = await getShortHash(ack.pub)
      let dbUser = db
        .get('user')
        .get(id)
        .put(generateUser(alias, ack.pub), () => {
          window.location.reload()
        })
    } else {
      error(ack.err)
    }
  })
}

export async function participate() {
  let id = await getShortHash(user.is.pub)
  let profile = gun.user().get(appPath).get('profile')
  profile.get('id').put(id)
  profile.get('pub').put(user.is.pub)
  let dbUser = db
    .get('user')
    .get(id)
    .put(profile, () => {
      notify(`User ${user.profile?.title} is participating with id ${id}`)
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
