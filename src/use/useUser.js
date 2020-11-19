import { gun, db } from '../store/gun-db.js'
import { notify, error } from '../store/history.js'
import { reactive } from 'vue'

export const user = reactive({
  initiated: false,
  isLoggedIn: false,
  ref: gun.user,
  is: null,
  profile: {
    createdAt: null,
    avatar: null,
  },
  info: {},
  rating: {},
})

export function useUser() {
  if (!user.initiated) {
    init()
    user.initiated = true
  }

  return {
    user,
    logOut,
    createUser,
    findUser,
    authUser,
    recallUser,
  }
}

function init() {
  recallUser()
  gun.on('auth', (ack) => {
    gun
      .user()
      .get('profile')
      .map()
      .on((data, key) => {
        user.profile[key] = data
      })
    db.get('users')
      .get(gun.user().is.pub)
      .map()
      .on((data, key) => {
        user.info[key] = data
        console.log(key, data)
      })
    gun
      .user()
      .get('rating')
      .map()
      .on((data, key) => {
        user.rating[key] = data
      })
  })
}

function logIn() {
  user.isLoggedIn = true
  user.is = gun.user().is
  notify('You successfully logged in as ' + user.is.alias + '.')
}

function findUser(alias, cb) {
  gun.get('~@' + alias).once(cb)
}

function createUser(alias, pass) {
  findUser(alias, (data) => {
    if (data) {
      error('user already exists!')
    } else {
      gun.user().create(alias, pass, (ack) => {
        if (!ack.err) {
          if (gun.user().is) {
            addUserToDB()
            logIn()
          }
        } else {
          error(ack.err)
        }
      })
    }
  })
}

function addUserToDB() {
  db.get('users')
    .get(gun.user().is.pub)
    .put({
      ...gun.user().is,
      createdAt: Date.now(),
    })
}

function authUser(alias, pass) {
  gun.user().auth(alias, pass, (ack) => {
    if (!ack.err) {
      logIn()
    } else {
      error(ack.err)
    }
  })
}

function logOut() {
  gun.user().leave()
  setTimeout(() => {
    if (!gun.user()._?.sea) {
      user.isLoggedIn = false
      user.is = null
      user.initiated = false
      notify('User logged out')
      window.location.reload()
    }
  }, 300)
}

function recallUser() {
  gun.user().recall({ sessionStorage: true }, (ack) => {
    if (!ack.err) {
      logIn()
    } else {
      error("Couldn't recall a user")
    }
  })
}
