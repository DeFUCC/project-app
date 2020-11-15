import { gun } from '../store/gun-db.js'
import { notify, error } from '../store/history.js'
import { reactive } from 'vue'

export const user = reactive({
  isLoggedIn: false,
  ref: gun.user,
  profileRef: gun.user().get('profile'),
  is: null,
  profile: {
    createdAt: null,
    avatar: null,
  },
})

let initiated = false

export function useUser() {
  if (!initiated) {
    init()
    initiated = true
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
  })
}

function logIn() {
  user.isLoggedIn = true
  user.is = gun.user().is
  notify('User ' + user.is.alias + ' is logged in!')
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
          setTimeout(() => {
            gun.user().get('createdAt').put(Date.now())
            console.log('created!')
          }, 1000)

          logIn()
        } else {
          error(ack.err)
        }
      })
    }
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
      initiated = false
      notify('User logged out')
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
