import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { WS_GAME_NAMESPACE } from '@/utils/constants'

export const state = reactive({
  connected: false,
  error: null,
  currentQuestion: null,
  gameOver: false,
  remainingTime: null,
  currentQuestionTime: null,
  isAnswerCorrect: null,
  players: [],
  winners: [],
  currentAnswer: null,
  questionTimeLeft: null,
  isEliminated: false,
  hasAnswered: false
})

const URL = import.meta.env.VITE_WS_URL + WS_GAME_NAMESPACE

const socket = io(URL, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  forceNew: true,
  auth: {
    token: localStorage.getItem('token')
  }
})

export const clearGameSocketState = () => {
  state.connected = false
  state.error = null
  state.currentQuestion = null
  state.currentAnswer = null
  state.gameOver = false
  state.remainingTime = null
  state.players = []
  state.winners = []
  state.isAnswerCorrect = null
  state.isEliminated = false
  state.questionTimeLeft = null
  state.gameOver = false
  state.hasAnswered = false
}
export const sendAnswer = ({ answer, answerTime }) => {
  socket.emit('answer_question', { answer, answerTime })
}

/* Events */
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
socket.on('error', (err) => {
  state.error = err
  console.log(err)
})
socket.on('players', (players) => {
  state.players = players
})
socket.on('new_question', (question) => {
  console.log(question)
  state.currentQuestion = question
  state.currentQuestionTime = Date.now()
  state.isAnswerCorrect = null
  state.currentAnswer = null
  state.hasAnswered = false
})
socket.on('answer_is_correct', (isCorrect) => {
  state.isAnswerCorrect = isCorrect
})
socket.on('player_eliminated', () => {
  state.isEliminated = true
})
socket.on('question_time_left', (time) => {
  state.questionTimeLeft = time
})
socket.on('game_over', () => {
  state.gameOver = true
})
socket.on('has_answered', () => {
  state.hasAnswered = true
})

export default socket
