<script setup>
import { RouterView, useRouter } from 'vue-router'
import friendsSocket from './websockets/friends.ws'
import notificationSocket, { state } from './websockets/notification.ws'
import { watchEffect } from 'vue'
import { useAuthStore } from './stores/auth.store'
import { useUserQuery } from 'queries/user/useUserQuery'
import { ThemeProvider } from 'vue3-styled-components'
import theme from 'utils/theme'
import InvitationGameModal from 'components/InvitationGameModal'
import { toast } from 'vue3-toastify'
import './assets/main.css'

const authStore = useAuthStore()
const { data: user } = useUserQuery()
const router = useRouter()

watchEffect(() => {
  if (!user.value) return
  authStore.setUserRoles(user.value.roles)
})

watchEffect(() => {
  if (!authStore.isAuthenticated) return
  friendsSocket.auth = { token: authStore.token }
  notificationSocket.auth = { token: authStore.token }
  friendsSocket.connect()
  notificationSocket.connect()
})

watchEffect(() => {
  if (!state.newAchievement) return
  toast(
    `<strong>${state.newAchievement}</strong>\n<p>Congratulations ! You have unlocked a new achievement !</p>`,
    {
      hideProgressBar: true,
      autoClose: 5000,
      dangerouslyHTMLString: true,
      icon: '🏆',
      onClick: () => {
        router.push({ name: 'achievements' })
      }
    }
  )
  state.newAchievement = null
})
</script>

<template>
  <ThemeProvider :theme="theme">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
    <InvitationGameModal />
  </ThemeProvider>
</template>

<style scoped></style>
