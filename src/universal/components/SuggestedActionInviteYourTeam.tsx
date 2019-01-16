import {SuggestedActionInviteYourTeam_suggestedAction} from '__generated__/SuggestedActionInviteYourTeam_suggestedAction.graphql'
import React, {lazy} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import LoadableModal from 'universal/components/LoadableModal'
import {PALETTE} from '../styles/paletteV2'
import SuggestedActionButton from './SuggestedActionButton'
import SuggestedActionCard from './SuggestedActionCard'
import SuggestedActionCopy from './SuggestedActionCopy'

interface Props {
  suggestedAction: SuggestedActionInviteYourTeam_suggestedAction
}

const AddTeamMemberModal = lazy(() =>
  import(/* webpackChunkName: 'AddTeamMemberModal' */ './AddTeamMemberModal')
)

const SuggestedActionInviteYourTeam = (props: Props) => {
  const {id: suggestedActionId, suggestedAction} = props
  const {team} = suggestedAction
  const {name: teamName, teamMembers} = team
  return (
    <SuggestedActionCard
      backgroundColor={PALETTE.BACKGROUND.BLUE}
      iconName='group_add'
      suggestedActionId={suggestedActionId}
    >
      <SuggestedActionCopy>Invite your teammates to: {teamName} </SuggestedActionCopy>
      <LoadableModal
        LoadableComponent={AddTeamMemberModal}
        queryVars={{team, teamMembers}}
        toggle={<SuggestedActionButton>Invite Your Teammates</SuggestedActionButton>}
      />
    </SuggestedActionCard>
  )
}

export default createFragmentContainer(
  SuggestedActionInviteYourTeam,
  graphql`
    fragment SuggestedActionInviteYourTeam_suggestedAction on SuggestedActionInviteYourTeam {
      id
      team {
        name
        ...AddTeamMemberModal_team
        teamMembers {
          ...AddTeamMemberModal_teamMembers
        }
      }
    }
  `
)
