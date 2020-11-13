import { gun } from '../store/gun-db.js'
import { notify, error } from '../store/history.js'
import { reactive } from 'vue'

export const user = reactive({
  isLoggedIn: false,
  ref: gun.user(),
  is: null,
  createdAt: null,
  avatar: null,
})

let initiated = false

export function useUser() {
  if (!initiated) {
    init()
    initiated = true
  }

  return {
    user,
  }
}

function init() {
  gun
    .user()
    .get('avatar')
    .on((data) => {
      console.log('new')
      user.avatar = data
    })
}

function logIn() {
  user.isLoggedIn = true
  user.is = gun.user().is
  notify('User ' + user.is.alias + ' is logged in!')
}

export function findUser(alias, cb) {
  gun.get('~@' + alias).once(cb)
}

export function createUser(alias, pass) {
  findUser(alias, (data) => {
    if (data) {
      error('user already exists!')
    } else {
      gun.user().create(alias, pass, (ack) => {
        if (!ack.err) {
          gun.user().get('createdAt').put('today')
          logIn()
        } else {
          error(ack.err)
        }
      })
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
      initiated = false
      notify('User logged out')
    }
  }, 300)
}

export function recallUser() {
  gun.user().recall({ sessionStorage: true }, (ack) => {
    if (!ack.err) {
      logIn()
    } else {
      error("Couldn't recall a user")
    }
  })
}
