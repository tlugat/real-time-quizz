import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { userKeys } from './user/userKeys'
import { gameKeys } from './game/gameKeys'
import { lobbyKeys } from './lobby/lobbyKeys'
import { userInvitationKeys } from './userInvitation/userInvitationKeys'
import { userFriendsKeys } from './userFriends/userFriendsKeys'
import { gameInvitationKeys } from './gameInvitation/gameInvitationKeys'
import { quizzThemeKeys } from './quizzTheme/quizzThemeKeys'
import { quizzThemePackKeys } from './quizzThemePack/quizzThemePackKeys'
import { historyKeys } from './history/historykeys'
import { gameStatsKeys } from './gameStats/gameStatsKeys'
import { quizzKeys } from './quizz/quizzKeys'
import { achievementKeys } from './achievement/achievementKeys'
import { inventoryKeys } from './inventory/inventoryKeys'

export const queryKeys = mergeQueryKeys(
  userKeys,
  gameKeys,
  lobbyKeys,
  userInvitationKeys,
  userFriendsKeys,
  gameInvitationKeys,
  quizzThemeKeys,
  quizzThemePackKeys,
  historyKeys,
  gameStatsKeys,
  quizzKeys,
  achievementKeys,
  inventoryKeys
)
