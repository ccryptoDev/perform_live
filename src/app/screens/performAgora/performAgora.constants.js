/**
 *
 * PerformAgora constants
 *
 */

export const PerformAgoraConstants = {
  FIREBASE_MESSAGE_TYPES: {
    // INVITE FLOW FROM PERFORMER
    INVITE_AUDIENCE_TO_STAGE: 'inviteAudienceToStage',
    INVITE_ACCEPTED_FOR_STAGE: 'inviteAcceptedForStage',
    INVITE_REJECTED_FOR_STAGE: 'inviteRejectedForStage',

    FOCUS_UNFOCUS_PRODUCT: 'focusUnfocusProduct',
    AUDIENCE_KICKED_FROM_PERFORMANCE: 'audienceKickedFromPerformance',
    PERFORMER_PROCESS_JOIN_REQUEST: 'performerProcessJoinRequest',
    AUDIENCE_KICKED_FROM_STAGE: 'audienceKickedFromStage',
    REQUEST_TO_JOIN_STAGE: 'requestToJoinStage',
    CANCEL_REQUEST_TO_JOIN_STAGE: 'cancelRequestToJoinStage',
    CANCEL_INVITE_TO_JOIN_STAGE: 'cancelInvitetToJoinStage',
    PERFORMANCE_IS_LIVE: 'performanceIsLive',
    PERFORMANCE_ENDED: 'performanceEnded',
    AUDIENCE_LEFT_STAGE: 'audienceLeftStage',
    REFRESH_PRODUCT_LIST: 'refreshProductList',
    LIKED_PERFORMANCE: 'likedPerformance',
  },
};
