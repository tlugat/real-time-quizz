<script setup>
import { defineProps } from 'vue';
import Modal from 'components/Modal';
import Text from 'components/Text';
import Button from 'components/Button';
import Cluster from 'components/layout/Cluster';
import styled from 'vue3-styled-components';
import Stack from 'components/layout/Stack';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  onClose: {
    type: Function,
    required: true
  },
  handleLeaveGame: {
    type: Function,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

const ButtonsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;

  & > * {
    width: 100% !important;
  }

  ${({ theme }) => theme.mediaQueries.tabletAndUp} {
    flex-direction: row;
    column-gap: 0.25rem;
    justify-content: end;

    & > * {
        width: auto !important;
    }
  }
`
const LeaveButton = styled(Button)`
  border: none !important;
  color: var(--red) !important;
  background-color: unset !important;
`
const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
   align-items: center;
    
    ${({ theme }) => theme.mediaQueries.tabletAndUp} {
        align-items: start;
    }
`
</script>

<template>
  <Modal 
    :isOpen="props.isOpen" 
    :onClose="onClose" 
    title="Game over"
    size="md"
    >
    <InnerWrapper>
        <Cluster align="center" gap="1rem">
            <img src="/icons/achievement.svg" alt="achievement" />
            <Text   Text variant="h4">You got {{ props.score }}pt</Text>
        </Cluster>
        <ButtonsWrapper>
            <Button @click="onClose">
                Stay here
            </Button>
            <LeaveButton @click="handleLeaveGame">
                Leave the game
            </LeaveButton>
        </ButtonsWrapper>
    </InnerWrapper>
  </Modal>
</template>

