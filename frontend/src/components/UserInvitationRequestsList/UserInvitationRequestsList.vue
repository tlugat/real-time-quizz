<script setup>
import { useUserRequestsQuery } from 'queries/userInvitation/useUserRequestsQuery'
import { useCancelUserInvitationMutation } from 'queries/userInvitation/useCancelUserInvitationMutation'
import styled from 'vue3-styled-components'
import Button from '@/components/Button'
import Text from '@/components/Text'

const { data: requests } = useUserRequestsQuery()
const cancelUserInvitation = useCancelUserInvitationMutation()

const cancelRequest = (invitationId) => {
  cancelUserInvitation.mutate(invitationId)
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 1.5rem;
  justify-content: space-between;
  gap: 1.5rem;
  border: 2px solid var(--black);
  background: var(--white);
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    max-width: 50rem;
  }
`
</script>

<template lang="">
  <Container>
    <Card v-for="request in requests" :key="request._id">
      <Text variant="p"
        >You send a friend request to <b>{{ request.recipient.username }}</b>
      </Text>
      <Button @click="cancelRequest(request._id)" bgColor="--red">Cancel</Button>
    </Card>
  </Container>
</template>

<style lang=""></style>
