import camelCase from 'lodash/camelCase';
import { isSafari } from '../browserCheck';
import { log, logger } from '../logger';
import AgoraRTCClient from './AgoraRTCClient';

const localLog = logger.init('local', 'green');
const errorLog = logger.init('error', 'red');

export default class AgoraRTCClientBroadcast extends AgoraRTCClient {
  constructor(accountUid, appId, params) {
    super(accountUid, appId, params);

    this.joinedUsers = [];
    this.leftUsers = [];
    if (typeof params.joinedUsers !== 'undefined') {
      this.joinedUsers = params.joinedUsers;
    }
    this.mainStream = '';
    this.testStream = '';
    this.getStreamById = this.getStreamById.bind(this);
  }

  getStreamById(id) {
    const streamList = this.streams;
    return streamList.filter(item => item.getId() === id)[0];
  }

  bindEvents() {
    const { client } = this;
    const self = this;

    // subscribeStreamEvents
    client.on('stream-added', evt => {
      const stream = evt.stream;
      const id = stream.getId();
      localLog(`New stream added: ${id}`);
      localLog(new Date().toLocaleTimeString());
      localLog('Subscribe ', stream);
      client.subscribe(stream, err => {
        localLog('Subscribe stream failed', err);
      });
    });

    client.on('peer-leave', evt => {
      const id = evt.uid;
      localLog(`Peer has left: ${id}`);
      localLog(new Date().toLocaleTimeString());
      self.leftUsers.push(evt.uid);
      self.unsubscribeStream(evt.uid);
      // self.removeStream(evt.uid);
    });
    let activeSpeaker = 0;
    client.on('active-speaker', evt => {
      const id = parseInt(evt.uid);

      if (id && self.activeSpeaker !== id) {
        activeSpeaker = id;
        setTimeout(() => {
          if (activeSpeaker === id) {
            self.activeSpeaker = activeSpeaker;
            // const mainId = self.mainStream ? self.mainStream.getId() : null;
            // self.setHighStream(mainId, id);
          }
        }, 2000);
      }
    });

    client.on('stream-subscribed', evt => {
      const { stream } = evt;
      client.setStreamFallbackOption(stream, 2);
      localLog('Got stream-subscribed event');
      localLog(new Date().toLocaleTimeString());
      localLog(`Subscribe remote stream successfully: ${stream.getId()}`);
      const sId = stream.getId();
      self.addStream(stream);
      // Under poor network conditions, the SDK can choose to subscribe to the low-video stream or only the audio stream.
      client.setStreamFallbackOption(stream, 2);

      if (self.mainStream && self.mainStream.getId() !== stream.getId()) {
        client.setRemoteVideoStreamType(stream, 1);
      }
    });

    client.on('network-quality', stats => {
      self.downlinkNetworkQuality = stats.downlinkNetworkQuality;
      self.uplinkNetworkQuality = stats.uplinkNetworkQuality;
      self.emit('networkQuality', stats);
      window.debugLogger &&
        window.debugLogger.add(
          `downlinkNetworkQuality: ${stats.downlinkNetworkQuality}`,
        );
      window.debugLogger &&
        window.debugLogger.add(
          `uplinkNetworkQuality: ${stats.uplinkNetworkQuality}`,
        );
    });

    // This callback only supported in Google Chrome
    client.on('exception', evt => {
      console.log('exception', evt.code, evt.msg, evt.uid);
    });

    client.on('stream-fallback', ({ attr, uid }) => {
      if (attr === 1) {
        // the remote media stream falls back to audio-only due to unreliable network conditions.
        self.emit('onMuteVideo', { uid });
      }
      if (attr === 0) {
        // the remote media stream switches back to the video stream after the network conditions improve.
        self.emit('onUnmuteVideo', { uid });
      }
    });

    client.on('stream-removed', evt => {
      const { stream } = evt;
      const id = stream.getId();
      localLog(`Stream removed: ${id}`);
      localLog(new Date().toLocaleTimeString());
      self.unsubscribeStream(stream.getId());
      // self.removeStream(stream.getId());
    });

    ['mute-video', 'unmute-video'].forEach(eventName => {
      const isMute = eventName === 'mute-video';
      client.on(eventName, evt => {
        const propName = camelCase(`on-${eventName}`);
        self.remoteMuteVideos[evt.uid] = isMute;
        self.emit(propName, evt);
        localLog(`${propName} ${evt.uid}`);

        self.emit(propName, evt);
      });
    });

    ['mute-audio', 'unmute-audio'].forEach(eventName => {
      const isMute = eventName === 'mute-audio';
      client.on(eventName, evt => {
        const propName = camelCase(`on-${eventName}`);
        self.remoteMuteAudios[evt.uid] = isMute;
        self.emit(propName, evt);
      });
    });
  }

  setHighStream(prev, next) {
    super.setHighStream(prev, next);
  }

  joinChannel(channelName, role = 'ATTENDEE', tokenKey = null) {
    // return this.getChannelToken(this.accountUid, channelName, role).then(
    //   tokenKey =>
    return new Promise((resolve, reject) =>
      this.client.join(
        tokenKey,
        channelName,
        this.accountUid,
        uid => {
          this.channelName = channelName;
          log(uid, 'brown', `User ${uid} join channel successfully`);
          log(uid, 'brown', new Date().toLocaleTimeString());
          // let lowStreamParam = RESOLUTION_ARR[options.videoProfileLow];
          const lowStreamParam = [320, 180, 15, 140];
          this.client.setLowStreamParameter({
            width: lowStreamParam[0],
            height: lowStreamParam[1],
            framerate: lowStreamParam[2],
            bitrate: lowStreamParam[3],
          });

          // Create localstream
          resolve(uid);
        },
        err => {
          reject(err);
        },
      ),
    );
    // );
  }

  addStream(stream, push = false, dId = null) {
    const streamList = this.streams;
    const self = this;
    const id = stream.getId();
    // Check for redundant
    const redundant = streamList.some(item => item.getId() === id);
    if (redundant) {
      return;
    }
    // Do push for localStream and unshift for other streams
    if (push) {
      streamList.push(stream);
    } else {
      streamList.unshift(stream);
    }
    if (!dId) {
      dId = `subscribe-video-${id}`;
    }

    this.streams = streamList;
    if (!this.mainStream) {
      this.setHighStream(null, id);
    }

    stream.on('player-status-change', evt => {
      if (evt.isErrorState && evt.status === 'paused') {
        console.error(`Stream is paused unexpectedly. Trying to resume...`);
        stream
          .resume()
          .then(() => {
            console.log(`Stream is resumed successfully`);
          })
          .catch(e => {
            if (e.name === `NotAllowedError`) {
              self.emit('stream-not-allowed-auto-play', { id });
            }
            console.error(
              `Failed to resume stream. Error ${e.name} Reason ${e.message}`,
            );
          });
      }
    });
    this.emit('stream-added', { id });
    if (this.getStreams().length > 4) {
      // $("#live-video").addClass('video-more-4');
    }
  }

  unsubscribeStream(id) {
    const streamList = this.streams;
    const { client } = this;

    const stream = streamList.find(item => item.getId() === id);
    if (stream) {
      stream.close();
      client.unsubscribe(stream, err => {});
      this.removeStream(id);
    }
  }

  removeStream(id) {
    const mainId = this.mainStream ? this.mainStream.getId() : '';
    super.removeStream(id);
    if (this.activeSpeaker === id && this.mainStream) {
      this.activeSpeaker = this.mainStream.getId();
    }

    if (mainId === id && this.mainStream) {
      this.setHighStream(null, this.mainStream.getId());
    }
  }

  publishStream() {
    const { client } = this;
    client.publish(this.localStream, err => {});

    client.on('stream-published', evt => {
      client.enableDualStream(
        () => {
          console.log('Enable dual stream success!');
        },
        err => {
          console.log(err);
        },
      );
      this.emit('stream-published', this.localStream);
    });
  }

  createLocalStream(
    { attendeeMode, videoProfile, cameraId, microphoneId },
    callback = null,
  ) {
    const config = isSafari()
      ? {}
      : {
          cameraId,
          microphoneId,
        };
    const localStream = this.streamInit(
      this.accountUid,
      { attendeeMode, videoProfile },
      config,
    );
    this.localStream = localStream;
    localStream.on('accessDenied', () => {
      this.unpublishStream();
      this.leaveChannel();
    });

    localStream.init(
      () => {
        if (attendeeMode === 'audience') {
          return;
        }

        this.addStream(localStream, true);
        if (callback) {
          callback();
        }
      },
      err => {
        if (err && err.type === 'error' && err.msg === 'NotAllowedError') {
          //          Notify.danger('Media access NotAllowed Error: The request is not allowed by the user agent or the platform in the current context.', 50000);
        } else if (err && err.type === 'error' && err.msg === 'NotFoundError') {
          errorLog('Failed to find to local media.', 50000);
        } else {
          errorLog('Failed to get access to local media.', 50000);
        }
      },
    );
  }

  createStream({ attendeeMode, videoProfile, cameraId, microphoneId }) {
    const { client } = this;
    const config = isSafari()
      ? {}
      : {
          cameraId,
          microphoneId,
        };
    const stream = this.streamInit(
      this.accountUid,
      { attendeeMode, videoProfile },
      config,
    );
    this.testStream = stream;
    stream.on('accessDenied', () => {
      // this.unpublishStream();
      // this.leaveChannel();
    });
    stream.init(
      () => {
        // if (attendeeMode === 'audience') {
        //   return;
        // }
        // this.addStream(localStream, true);
        this.emit('test-stream-created', { id: stream.getId() });
      },
      err => {
        if (err && err.type === 'error' && err.msg === 'NotAllowedError') {
          //          Notify.danger('Media access NotAllowed Error: The request is not allowed by the user agent or the platform in the current context.', 50000);
        } else if (err && err.type === 'error' && err.msg === 'NotFoundError') {
          errorLog('Failed to find to local media.', 50000);
        } else {
          errorLog('Failed to get access to local media.', 50000);
        }
      },
    );
  }

  reset() {
    this.channelName = null;
    this.localStream = null;
    this.streams = [];
    this.remoteMuteVideos = {};
    this.remoteMuteAudios = {};
  }

  unpublishStream() {
    const { localStream, client, channelName } = this;
    if (!channelName || !client || !localStream) {
      return;
    }
    if (localStream.userMuteAudio) {
      localStream.unmuteAudio();
    }
    if (localStream.userMuteVideo) {
      localStream.unmuteVideo();
    }
    client.unpublish(localStream);
    this.removeStream(localStream.getId());
    localStream.close();
    this.localStream = null;
    this.emit('stream-unpublished', { id: localStream.getId() });
  }

  leaveChannel() {
    const { localStream, client } = this;
    // if (!channelName || !client) {
    if (!client) {
      return;
    }
    if (localStream) {
      client.unpublish(localStream);
      localStream.close();
    }
    client.leave(() => {
      this.reset();
    });
  }
}
