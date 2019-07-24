import {GraphQLID, GraphQLObjectType} from 'graphql'
import {makeResolveNotificationForViewer, resolveTask} from '../resolvers'
import NotifyTaskInvolves from './NotifyTaskInvolves'
import Task from './Task'
import StandardMutationError from './StandardMutationError'

const UpdateTaskPayload = new GraphQLObjectType({
  name: 'UpdateTaskPayload',
  fields: () => ({
    error: {
      type: StandardMutationError
    },
    task: {
      type: Task,
      resolve: resolveTask
    },
    privatizedTaskId: {
      type: GraphQLID,
      description: 'If a task was just turned private, this its ID, else null',
      resolve: ({taskId, isPrivatized}) => {
        return isPrivatized ? taskId : null
      }
    },
    addedNotification: {
      type: NotifyTaskInvolves,
      resolve: makeResolveNotificationForViewer('notificationIdsToAdd', 'notificationsToAdd')
    },
    removedNotification: {
      type: NotifyTaskInvolves,
      resolve: makeResolveNotificationForViewer('notificationIdsToRemove', 'notificationsToRemove')
    }
  })
})

export default UpdateTaskPayload
