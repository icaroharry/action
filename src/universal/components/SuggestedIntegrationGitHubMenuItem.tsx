import {SuggestedIntegrationGitHubMenuItem_suggestedIntegration} from '__generated__/SuggestedIntegrationGitHubMenuItem_suggestedIntegration.graphql'
import React, {forwardRef} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import GitHubSVG from 'universal/components/GitHubSVG'
import MenuItem from 'universal/components/MenuItem'
import MenuItemComponentAvatar from 'universal/components/MenuItemComponentAvatar'
import MenuItemLabel from 'universal/components/MenuItemLabel'
import useAtmosphere from 'universal/hooks/useAtmosphere'
import CreateGitHubIssueMutation from 'universal/mutations/CreateGitHubIssueMutation'
import {WithMutationProps} from 'universal/utils/relay/withMutationProps'
import TypeAheadLabel from './TypeAheadLabel'

interface Props {
  closePortal: () => void
  suggestedIntegration: SuggestedIntegrationGitHubMenuItem_suggestedIntegration
  taskId: string
  submitMutation: WithMutationProps['submitMutation']
  onError: WithMutationProps['onError']
  onCompleted: WithMutationProps['onCompleted']
  query: string
}

const SuggestedIntegrationGitHubMenuItem = forwardRef((props: Props, ref: any) => {
  const {query, suggestedIntegration, taskId, submitMutation, onError, onCompleted} = props
  const {nameWithOwner} = suggestedIntegration
  const atmosphere = useAtmosphere()
  return (
    <MenuItem
      ref={ref}
      label={
        <MenuItemLabel>
          <MenuItemComponentAvatar>
            <GitHubSVG />
          </MenuItemComponentAvatar>
          <TypeAheadLabel query={query} label={nameWithOwner} />
        </MenuItemLabel>
      }
      onClick={() => {
        const variables = {nameWithOwner, taskId}
        submitMutation()
        CreateGitHubIssueMutation(atmosphere, variables, {onError, onCompleted})
      }}
    />
  )
})

export default createFragmentContainer(
  SuggestedIntegrationGitHubMenuItem,
  graphql`
    fragment SuggestedIntegrationGitHubMenuItem_suggestedIntegration on SuggestedIntegrationGitHub {
      nameWithOwner
    }
  `
)