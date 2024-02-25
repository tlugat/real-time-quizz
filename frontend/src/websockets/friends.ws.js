import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { WS_FRIENDS_NAMESPACE } from '@/utils/constants'

export const state = reactive({
  connected: false,
  online: [],
  offline: [],
  error: null
})

const URL = import.meta.env.VITE_WS_URL + WS_FRIENDS_NAMESPACE

const socket = io(URL, {
  // reconnectionDelayMax: 10000,
  autoConnect: false,
  auth: {
    token: localStorage.getItem('token')
  }
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('connect_error', (err) => {
  console.error(err.message)
  state.error = err.message
})

socket.on('update', (friends) => {
  state.online = friends.online
  state.offline = friends.offline
})

export default socket
