import EventEmitter from 'events';
import camelCase from 'lodash/camelCase';
import config from 'app/config/index.config';
import AgoraRTCClient, {
  checkSystemRequirement as checkVideoRTCSystemRequirements,
  devices as rtcDevices,
} from './agora/AgoraRTCClient';
import AgoraRTCClientBroadcast from './agora/AgoraRTCClientBroadcast';
import { logger } from './logger';
import plToast from './toast';

const { AGORA_APP_ID } = config;
const localLog = logger.init('local', 'green');

const streamPlay = (stream, id, replay = false) => {
  if (stream.isPlaying()) {
    if (!replay) {
      return;
    }
    stream.stop();
  }
  stream.play(id);
  stream.on('player-status-change', evt => {
    if (evt.isErrorState && evt.status === 'paused') {
      stream
        .resume()
        .then(() => {
          console.log(`Stream is resumed successfully`);
        })
        .catch(e => {
          // show toast message to make user guesture and then resume again.
          plToast.error('You need to click to resume audio', {
            autoClose: false,
            onClose: () => window.perform && window.perform.replayStreams(),
            toastId: 'audioResume',
          });
          console.error(
            `Failed to resume stream. Error ${e.name} Reason ${e.message}`,
          );
        });
    }
  });
};

export const HandRaiseMessageType = {
  request: 'hand-raised-request',
  withdraw: 'hand-raised-withdraw',
  accepted: 'hand-raised-accepted',
  rejected: 'hand-raised-rejected',
  active: 'hand-raised-active',
  completed: 'hand-raised-completed',
  leaveRequest: 'hand-raised-leave-request',
};

export const Events = {
  goLive: 'go-live',
  getVideoLike: 'get-video-like',
  beforeUnload: 'before-unload',
  rtcLiveStreamRemoved: 'rtc-live-stream-removed',
  rtcLiveStreamAdded: 'rtc-live-stream-added',
  rtcVideoStreamRemoved: 'rtc-video-stream-removed',
  rtcVideoLocalStreamPublished: 'rtc-video-local-stream-published',
  rtcVideoActiveSpeaker: 'rtc-video-active-speaker',
  rtcVideoStreamAdded: 'rtc-video-stream-added',
  rtmConnectionStateChanged: 'rtm-connection-state-changed',
  rtcBrodCastStreamNotAllowedAutoPlay:
    'rtc-bordcast-stream-not-allowed-auto-play',
  liveEventLayoutInfo: 'live-event-layout-info',
  rtcLiveStreamPublished: 'rtc-live-stream-published',
  rtcLiveStreamUnpublished: 'rtc-live-stream-unpublished',
  rtcLiveStreamMuted: 'onMuteVideo',
  rtcLiveStreamUnMuted: 'onUnmuteVideo',
};

export const checkToAllowCameraPermission = async callback => {
  const response = await checkVideoRTCSystemRequirements(callback);
  return response;
};
export default class Perform extends EventEmitter {
  constructor(options = {}) {
    super();
    this.storage = localStorage;
    this.bordCastRTCClient = null;
    this.eventChannelName = null;
    this.videoRTCClient = null;
    this.rtmClient = null;
    this.streamPlay = streamPlay;
    this.members = {};
    this.authUser = null;
    this.channelMembers = {};
    this.liveEventLayout = {};
    this.rtcDevices = rtcDevices;
    this.channelToken = null;
    this.channelTypes = {
      default: 'test-live',
    };
    if (options.globalChannel) {
      this.setGlobalChannel(options.globalChannel);
      this.eventChannelName = options.globalChannel;
    }
    if (options.channelToken) {
      this.setGlobalChannelToken(options.channelToken);
    }
  }

  setGlobalChannel(channelName = 'global-performance') {
    this.channelTypes.global = channelName;
  }

  setGlobalChannelToken(channelToken) {
    this.channelToken = channelToken;
  }

  getAuthUser() {
    return this.authUser;
  }

  getRTCDevices() {
    return this.rtcDevices();
  }

  setAuthUser(user) {
    if (
      !user ||
      (this.authUser &&
        this.authUser.userId.toString() === user.userId.toString())
    ) {
      return this;
    }
    this.authUser = { tags: [], company: '', designation: '', ...user };
    return this;
  }

  getJoinMembers(channelName) {
    if (!channelName) {
      channelName = this.channelTypes.global;
    }

    return this.channelMembers[channelName]
      ? this.channelMembers[channelName]
      : [];
  }

  initRTCClient(params) {
    const uid = this.getAuthUser().userId;
    return new AgoraRTCClient(uid, AGORA_APP_ID, params);
  }

  initRTCClientBroadcast(params) {
    const uid = this.getAuthUser().userId;
    return new AgoraRTCClientBroadcast(uid, AGORA_APP_ID, params);
  }

  getVideoRTCClient() {
    if (!this.videoRTCClient) {
      this.videoRTCClient = this.initRTCClient({ mode: 'video' });
      this.videoRTCClient.on('stream-added', id => {
        localLog(`subscribed to  ${id}`);
        this.emit(Events.rtcVideoStreamAdded, { id });
      });
      this.videoRTCClient.on('stream-subscribed', ({ id }) => {});
      this.videoRTCClient.on('active-speaker', ({ id }) => {
        localLog(`rtc-video-active-speaker to  ${id}`);

        this.emit(Events.rtcVideoActiveSpeaker, { id });
      });

      this.videoRTCClient.on('stream-published', () => {
        this.emit(Events.rtcVideoLocalStreamPublished);
      });

      this.videoRTCClient.on('stream-removed', id => {
        localLog(`${id} has left the room`);
        this.emit(Events.rtcVideoStreamRemoved, { id });
      });

      ['mute-video', 'unmute-video', 'mute-audio', 'unmute-audio'].forEach(
        event => {
          const eventName = camelCase(`on-${event}`);
          this.videoRTCClient.on(eventName, evt => {
            localLog(`${evt.uid} has ${eventName}`);
            this.emit(`${eventName}RTC`, evt);
          });
        },
      );
    }
    return this.videoRTCClient;
  }

  getBordCastRTCClient(joinedUsers) {
    if (!this.bordCastRTCClient) {
      this.bordCastRTCClient = this.initRTCClientBroadcast({
        mode: 'live',
        joinedUsers,
      });
      this.bordCastRTCClient.on('stream-not-allowed-auto-play', ({ id }) => {
        this.emit(Events.rtcBrodCastStreamNotAllowedAutoPlay, { id });
      });

      this.bordCastRTCClient.on('stream-added', id => {
        this.emit(Events.rtcLiveStreamAdded, { id });
      });

      this.bordCastRTCClient.on('networkQuality', stats => {
        this.emit('networkQuality', stats);
      });

      this.bordCastRTCClient.on('test-stream-created', stats => {
        this.emit('test-stream-created', stats);
      });

      this.bordCastRTCClient.on('stream-published', id => {
        this.emit(Events.rtcLiveStreamPublished, { id });
      });

      this.bordCastRTCClient.on('stream-unpublished', id => {
        this.emit(Events.rtcLiveStreamUnpublished, { id });
      });

      this.bordCastRTCClient.on('stream-removed', id => {
        this.emit(Events.rtcLiveStreamRemoved, { id });
      });
      ['mute-video', 'unmute-video', 'mute-audio', 'unmute-audio'].forEach(
        event => {
          const eventName = camelCase(`on-${event}`);
          this.bordCastRTCClient.on(eventName, evt => {
            this.emit(eventName, evt);
          });
        },
      );
    }
    return this.bordCastRTCClient;
  }

  joinHostEvent(attendeeMode = 'video', joinedUsers = [], callback = () => {}) {
    const client = this.getBordCastRTCClient(joinedUsers);
    client.joinedUsers = joinedUsers;
    if (client.channelName === this.eventChannelName) {
      return false;
    }
    let role = 'ATTENDEE';
    if (attendeeMode === 'video') {
      role = 'HOST';
    }
    //  this.eventChannelName = eventChannelName;
    client
      .joinChannel(this.eventChannelName, role, this.channelToken)
      .then(() => {
        client.bindEvents();
        // if (attendeeMode === 'video') {
        //   client.createStream({ attendeeMode, videoProfile: '720p_1' });
        //   // client.publishStream({ attendeeMode, videoProfile: '720p_1' });
        // }
        callback();
      });
    return true;
  }

  setLiveEventLayout(liveEventLayout) {
    this.liveEventLayout = liveEventLayout;
  }

  unpublishStream() {
    this.bordCastRTCClient.unpublishStream();
  }

  replayStreams() {
    if (!this.bordCastRTCClient) {
      return;
    }
    this.bordCastRTCClient.getStreams().forEach(stream => {
      this.playStream(stream, `stream-${stream.getId()}`, true);
    });
  }

  publishStream() {
    this.bordCastRTCClient.publishStream({
      attendeeMode: 'video',
      videoProfile: '720p_3',
    });
  }

  audioEvent(ptype = null) {
    if (!ptype) {
      this.bordCastRTCClient.localStream.muteAudio();
    } else {
      this.videoRTCClient.localStream.muteAudio();
    }
  }

  videoEvent(ptype = null) {
    if (!ptype) {
      this.bordCastRTCClient.localStream.muteVideo();
    } else {
      this.videoRTCClient.localStream.muteVideo();
    }
  }

  audioMuteEvent(ptype = null) {
    if (!ptype) {
      this.bordCastRTCClient.localStream.unmuteAudio();
    } else {
      this.videoRTCClient.localStream.unmuteAudio();
    }
  }

  videoMuteEvent(ptype = null) {
    if (!ptype) {
      this.bordCastRTCClient.localStream.unmuteVideo();
    } else {
      this.videoRTCClient.localStream.unmuteVideo();
    }
  }

  goLive(sessionName = 'Session') {
    const channelName = this.channelTypes.global;
  }

  getVideoLike(type) {
    const channelName = this.channelTypes.global;
  }

  endLiveSession(sessionName = 'Session') {
    const channelName = this.channelTypes.global;
  }

  joinAsSpeaker(host) {
    // this.rtmClient.sendPeerMessage('speaker-joined', this.authUser, host);
  }

  getLocalStreamSubscriber() {
    return this.getVideoRTCClient().localStreamSubscribed;
  }

  addLocalStreamSubscriber(id) {
    this.getVideoRTCClient().addLocalStreamSubscriber(id);
    this.emit(Events.rtcVideoStreamAdded, { id });
  }

  getMembersList(channel = null) {
    let channelName = channel;
    if (!channelName) {
      channelName = this.channelTypes.global;
    }

    // return this.getRTMChannelMembers(channelName)
    //   .then((members) => {
    //     return members;
    //   })
    //   .catch(() => { });
  }

  playStream(stream, id, replay = false) {
    this.streamPlay(stream, id, replay);
  }

  beforeUnload() {
    this.emit(Events.beforeUnload);
    if (this.bordCastRTCClient) {
      this.bordCastRTCClient.leaveChannel();
    }

    if (this.videoRTCClient) {
      this.videoRTCClient.leaveChannel();
    }

    // if (this.rtmClient) {
    //   this.rtmClient.logout();
    // }
  }

  leaveBroadCastRTC() {
    if (this.bordCastRTCClient) {
      this.bordCastRTCClient.leaveChannel();
      this.bordCastRTCClient = null;
    }

    if (this.bordCastScreenShareRTCClient) {
      this.bordCastScreenShareRTCClient.leaveChannel();
      this.bordCastScreenShareRTCClient = null;
    }
  }

  leaveRTC() {
    this.leaveBroadCastRTC();

    if (this.videoRTCClient) {
      this.videoRTCClient.leaveChannel();
    }
  }
}
