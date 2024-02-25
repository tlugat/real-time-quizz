<script setup>
import { useUserInvitationsQuery } from 'queries/userInvitation/useUserInvitationsQuery';
import { useAcceptUserInvitationMutation } from 'queries/userInvitation/useAcceptUserInvitationMutation';
import { useDeclineUserInvitationMutation } from 'queries/userInvitation/useDeclineUserInvitationMutation';
import styled from 'vue3-styled-components'
import Button from '@/components/Button'
import Text from '@/components/Text'

const { data: invitations } = useUserInvitationsQuery();

const acceptUserInvitation = useAcceptUserInvitationMutation();
const declineUserInvitation = useDeclineUserInvitationMutation();

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
const FromButton = styled(Button)` 
  width:100%;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${({ theme }) => theme.mediaQueries.desktopAndUp} {
    flex-direction: row;
  }
`
</script>

<template lang="">

    <Container>
        <Card v-for="invitation in invitations" :key="invitation._id">
            <Text variant="p"> <b> {{ invitation.inviter.username }} </b>  would like to add you as a friend</Text>
            <ButtonGroup>
                <FromButton bgColor="--red" @click="declineUserInvitation.mutate(invitation._id)">Decline</FromButton>
                <FromButton bgColor="--primary" @click="acceptUserInvitation.mutate(invitation._id)">Confirm</FromButton>
            </ButtonGroup>
        </Card>
    </Container>
</template>

<style lang="">
    
</style>