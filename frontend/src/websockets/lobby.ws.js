import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { WS_LOBBY_NAMESPACE } from '@/utils/constants'

export const state = reactive({
  connected: false,
  notification: null,
  players: [],
  error: null,
  messages: [],
  themes: [],
  votedTheme: null,
  isValidationInProgress: false,
  validationTime: 30,
  validatedUsers: [],
  gameCreationInProgress: false
})

const URL = import.meta.env.VITE_WS_URL + WS_LOBBY_NAMESPACE

const socket = io(URL, {
  // reconnectionDelayMax: 10000,
  autoConnect: false,
  forceNew: true,
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

socket.on('players', (data) => {
  state.players = data
})

socket.on('connect_error', (err) => {
  console.error(err.message)
  state.error = err.message
})

socket.on('error', (err) => {
  state.error = err
  console.log(err)
})

socket.on('notification', (msg) => {
  state.notification = msg
})

socket.on('message', (msg) => {
  state.messages.push(msg)
})

socket.on('theme_voted', (themes) => {
  state.themes = themes
})

socket.on('all_players_voted', (votedTheme) => {
  state.votedTheme = votedTheme
})

socket.on('validation_started', (validationTime) => {
  state.isValidationInProgress = true
  state.validationTime = validationTime
})

socket.on('validation_ended', () => {
  state.isValidationInProgress = false
})

socket.on('user_validated', (users) => {
  state.validatedUsers = users
})

socket.on('game_creation_started', () => {
  state.gameCreationInProgress = true
})

socket.on('game_created', () => {
  state.gameCreationInProgress = false
})

export const clearLobbySocketState = () => {
  state.notification = null
  state.error = null
  state.messages = []
  state.themes = []
  state.votedTheme = null
  state.isValidationInProgress = false
  state.validatedUsers = []
  state.gameCreationInProgress = false
}

export default socket
