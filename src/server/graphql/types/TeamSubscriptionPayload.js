import GraphQLSubscriptionType from 'server/graphql/GraphQLSubscriptionType';
import AcceptTeamInviteEmailPayload from 'server/graphql/types/AcceptTeamInviteEmailPayload';
import AcceptTeamInviteNotificationPayload from 'server/graphql/types/AcceptTeamInviteNotificationPayload';
import AddTeamCreatorPayload from 'server/graphql/types/AddTeamCreatorPayload';
import ArchiveTeamPayload from 'server/graphql/types/ArchiveTeamPayload';
import EndMeetingPayload from 'server/graphql/types/EndMeetingPayload';
import InviteTeamMembersInviteePayload from 'server/graphql/types/InviteTeamMembersInviteePayload';
import KillMeetingPayload from 'server/graphql/types/KillMeetingPayload';
import MoveMeetingPayload from 'server/graphql/types/MoveMeetingPayload';
import PromoteFacilitatorPayload from 'server/graphql/types/PromoteFacilitatorPayload';
import RemoveTeamMemberSelfPayload from 'server/graphql/types/RemoveTeamMemberExMemberPayload';
import RemoveTeamMemberOtherPayload from 'server/graphql/types/RemoveTeamMemberOtherPayload';
import RequestFacilitatorPayload from 'server/graphql/types/RequestFacilitatorPayload';
import StartMeetingPayload from 'server/graphql/types/StartMeetingPayload';
import UpdateCheckInQuestionPayload from 'server/graphql/types/UpdateCheckInQuestionPayload';
import UpdateTeamNamePayload from 'server/graphql/types/UpdateTeamNamePayload';
import UpgradeToProPayload from 'server/graphql/types/UpgradeToProPayload';


const types = [
  AcceptTeamInviteEmailPayload,
  AcceptTeamInviteNotificationPayload,
  AddTeamCreatorPayload,
  ArchiveTeamPayload,
  EndMeetingPayload,
  InviteTeamMembersInviteePayload,
  KillMeetingPayload,
  MoveMeetingPayload,
  PromoteFacilitatorPayload,
  RequestFacilitatorPayload,
  StartMeetingPayload,
  RemoveTeamMemberOtherPayload,
  RemoveTeamMemberSelfPayload,
  UpdateCheckInQuestionPayload,
  UpdateTeamNamePayload,
  UpgradeToProPayload
];

export default new GraphQLSubscriptionType('TeamSubscriptionPayload', types);
