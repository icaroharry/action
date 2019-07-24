import {GraphQLNonNull} from 'graphql'
import getRethink from '../../database/rethinkDriver'
import UpdatedTeamInput from '../types/UpdatedTeamInput'
import UpdateTeamNamePayload from '../types/UpdateTeamNamePayload'
import {getUserId, isTeamMember} from '../../utils/authorization'
import publish from '../../utils/publish'
import {TEAM} from '../../../client/utils/constants'
import teamNameValidation from '../../../client/validation/teamNameValidation'
import standardError from '../../utils/standardError'

export default {
  type: UpdateTeamNamePayload,
  args: {
    updatedTeam: {
      type: new GraphQLNonNull(UpdatedTeamInput),
      description: 'The input object containing the teamId and any modified fields'
    }
  },
  async resolve (source, {updatedTeam}, {authToken, dataLoader, socketId: mutatorId}) {
    const r = getRethink()
    const now = new Date()
    const operationId = dataLoader.share()
    const subOptions = {mutatorId, operationId}
    const viewerId = getUserId(authToken)

    // AUTH
    const teamId = updatedTeam.id
    if (!isTeamMember(authToken, teamId)) {
      return standardError(new Error('Team not found'), {userId: viewerId})
    }

    // VALIDATION
    const team = await r.table('Team').get(teamId)
    const orgTeams = await dataLoader.get('teamsByOrgId').load(team.orgId)
    const orgTeamNames = orgTeams.filter((team) => team.id !== teamId).map((team) => team.name)
    const {error, value: name} = teamNameValidation(updatedTeam.name, orgTeamNames)
    if (error) {
      return standardError(new Error('Failed validation'), {userId: viewerId})
    }

    // RESOLUTION
    // update the dataLoader cache
    const cachedTeam = orgTeams.find((team) => team.id === teamId)
    cachedTeam.name = name
    const dbUpdate = {
      name,
      updatedAt: now
    }
    await r
      .table('Team')
      .get(teamId)
      .update(dbUpdate)

    const data = {teamId}
    publish(TEAM, teamId, UpdateTeamNamePayload, data, subOptions)
    return data
  }
}
