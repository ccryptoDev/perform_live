import EventEmitter from 'events';
import AgoraRTC from 'agora-rtc-sdk';
import merge from 'lodash/merge';
import camelCase from 'lodash/camelCase';
import config from 'app/config/index.config';
import { logger, log } from '../logger';
import { isSafari } from '../browserCheck';
import AuthService from '../authService';

const globalLog = logger.init('global', 'blue');
const localLog = logger.init('local', 'green');
const errorLog = logger.init('error', 'red');

// Find all audio and video devices
let audioDevices = [];
let videoDevices = [];
AgoraRTC.getDevices(devices => {
  audioDevices = devices.filter(device => device.kind === 'audioinput');
  videoDevices = devices.filter(device => device.kind === 'videoinput');
});

export const devices = () => ({
  audioDevices,
  videoDevices,
});

export const checkSystemRequirement = callback => {
  if (!callback) {
    callback = () => {};
  }

  if (!AgoraRTC.checkSystemRequirements()) {
    return Promise.reject({
      status: false,
      info: 'Not Fullfill System Requirements',
      type: 'NOT_SUPPORTED',
      message:
        'This browser does not support to join channel using camera and microphone.',
    });
  }
  return new Promise((resolve, reject) => {
    resolve(true);
  });

  // return new Promise((resolve, reject) => {
  //   const stream = AgoraRTC.createStream({
  //     audio: true,
  //     video: videoDevices.length > 0,
  //     screen: false,
  //   });
  //   const setTimeoutHandler = setTimeout(() => {
  //     const message = `Request is pending, Please grant access to camera and microphone.`;
  //     if (callback) {
  //       return callback(message);
  //     }
  //   }, 500);
  //   stream.init(
  //     () => {
  //       stream.close();
  //       clearTimeout(setTimeoutHandler);
  //       return resolve({ status: true, error: '' });
  //     },
  //     err => {
  //       stream.close();
  //       clearTimeout(setTimeoutHandler);
  //       const errorMessages = {
  //         NotAllowedError: `You refused to grant access to camera or audio resource.`,
  //         MEDIA_OPTION_INVALID: `The camera is occupied or the resolution is not supported(on browsers in early versions).`,
  //         DEVICES_NOT_FOUND: `No device is found.`,
  //         NOT_SUPPORTED: `The browser does not support using camera and microphone.`,
  //         PERMISSION_DENIED: `The device is disabled by the browser or the user has denied permission of using the device.`,
  //         CONSTRAINT_NOT_SATISFIED: `The settings are illegal(on browsers in early versions).`,
  //       };
  //       let message = errorMessages[err.msg]
  //         ? errorMessages[err.msg]
  //         : 'Please check the browser permission.';
  //       if (err.msg === 'NotAllowedError' && err.info === 'Permission denied') {
  //         message = `You have not allowed to grant access to camera or audio resource. Please allow to access for camera or audio resource.`;
  //       }
  //       return reject({
  //         status: false,
  //         info: err.info,
  //         type: err.msg,
  //         message,
  //       });
  //     },
  //   );
  // });
};

export const getChannelToken = (uid, channelName, role, token) => {
  if (!uid && !channelName) {
    return Promise.resolve();
  }
  if (token) {
    return Promise.resolve(token);
  }
};

export default class AgoraRTCClient extends EventEmitter {
  constructor(accountUid, appId, params) {
    super();
    const mode = params.mode === 'live' ? 'live' : 'rtc';
    this.client = AgoraRTC.createClient({ mode });
    this.reset();
    this.localStreamSubscribed = [];
    this.accountUid = accountUid;
    this.appId = appId;
    this.activeSpeaker = 0;
    this.mainStream = null;
    this.remoteMuteVideos = {};
    this.remoteMuteAudios = {};
    this.videoDevices = videoDevices;
    this.audioDevices = audioDevices;
    this.downlinkNetworkQuality = 0;
    this.uplinkNetworkQuality = 0;
    /**
      "0": The network quality is unknown.
      "1": The network quality is excellent.
      "2": The network quality is quite good, but the bitrate may be slightly lower than excellent.
      "3": Users can feel the communication slightly impaired.
      "4": Users can communicate only not very smoothly.
      "5": The network is so bad that users can hardly communicate.
      "6": The network is down and users cannot communicate at all.
      Optional uplinkNetworkQuality
    * */
    // this.bindEvents();
    this.clientInit();
  }

  clientInit() {
    if (!['test', 'dev'].includes(process.env.REACT_APP_ENV)) {
      AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR);
      // AgoraRTC.Logger.enableLogUpload();
    }
    return this.client.init(this.appId, () => {
      globalLog('RTC client initialized');
    });
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
      self.emit('peer-leave', { id });
      self.removeStream(evt.uid);
      self.removeLocalStreamSubscriber(evt.uid);
    });

    let activeSpeaker = 0;
    client.on('active-speaker', evt => {
      const id = parseInt(evt.uid);
      if (id && self.activeSpeaker !== id) {
        activeSpeaker = id;
        setTimeout(() => {
          if (activeSpeaker === id) {
            self.updateActiveSpeaker(id);
          }
        }, self.activeSpeaker === 0 ? 5 : 2000);
      }
    });

    client.on('network-quality', stats => {
      self.downlinkNetworkQuality = stats.downlinkNetworkQuality;
      self.uplinkNetworkQuality = stats.uplinkNetworkQuality;
      window.debugLogger &&
        window.debugLogger.add(
          `downlinkNetworkQuality: ${stats.downlinkNetworkQuality}`,
        );
      window.debugLogger &&
        window.debugLogger.add(
          `uplinkNetworkQuality: ${stats.uplinkNetworkQuality}`,
        );
    });

    client.on('stream-subscribed', evt => {
      const { stream } = evt;
      localLog('Got stream-subscribed event');
      localLog(new Date().toLocaleTimeString());
      localLog(`Subscribe remote stream successfully: ${stream.getId()}`);
      window.debugLogger &&
        window.debugLogger.add(
          `Subscribe remote stream successfully: ${stream.getId()}`,
        );
      self.addStream(stream);
      // Under poor network conditions, the SDK can choose to subscribe to the low-video stream or only the audio stream.
      client.setStreamFallbackOption(stream, 2);
      self.emit('stream-subscribed', { id: stream.getId() });
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
      self.removeStream(stream.getId());
    });

    ['mute-video', 'unmute-video'].forEach(eventName => {
      const isMute = eventName === 'mute-video';
      client.on(eventName, evt => {
        const propName = camelCase(`on-${eventName}`);
        self.remoteMuteVideos[evt.uid] = isMute;
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
    this.infoDetectSchedule();
  }

  getStreams() {
    return this.streams;
  }

  unpublishStream() {
    this.client.unpublish(this.localStream);
  }

  getChannelToken(uid, channelName, role, token) {
    return getChannelToken(uid, channelName, role, token);
  }

  joinChannel(channelName, token = null, role = 'ATTENDEE') {
    return this.getChannelToken(this.accountUid, channelName, role, token).then(
      tokenKey =>
        new Promise((resolve, reject) =>
          this.client.join(
            token,
            channelName,
            this.accountUid,
            uid => {
              this.uid = uid;
              this.channelName = channelName;
              log(uid, 'brown', `User ${uid} join channel successfully`);
              log(uid, 'brown', new Date().toLocaleTimeString());
              window.debugLogger &&
                window.debugLogger.add(`User ${uid} join channel successfully`);
              this.client.enableDualStream(
                () => {
                  console.log('Enable dual stream success!');
                  window.debugLogger &&
                    window.debugLogger.add(`Enable dual stream success!`);
                },
                err => {
                  console.log(err);
                },
              );
              const lowStreamParam = [160, 120, 15, 65]; // RESOLUTION_ARR[options.videoProfileLow];
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
              window.debugLogger && window.debugLogger.add(err);
            },
          ),
        ),
    );
  }

  streamInit(uid, options, config) {
    const defaultConfig = {
      streamID: uid,
      audio: true,
      video: true,
      screen: false,
    };

    switch (options.attendeeMode) {
      case 'audio-only':
        defaultConfig.video = false;
        break;
      case 'audience':
        defaultConfig.video = false;
        defaultConfig.audio = false;
        break;
      default:
      case 'video':
        break;
    }
    // eslint-disable-next-line
    const steamConfig = merge(defaultConfig, config);
    steamConfig.video = true;
    const stream = AgoraRTC.createStream(steamConfig);
    stream.setVideoProfile(options.videoProfile);
    return stream;
  }

  addStream(stream, push = false) {
    const streamList = this.streams;
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

    this.streams = streamList;
    this.emit('stream-added', { id });
  }

  updateActiveSpeaker(uid) {
    if (this.activeSpeaker === parseInt(uid)) {
      return;
    }
    this.activeSpeaker = parseInt(uid);
    this.emit('active-speaker', { id: this.activeSpeaker });
  }

  removeStream(id) {
    const streamList = this.streams;
    streamList.map((item, index) => {
      if (item.getId() === id) {
        // streamList[index].stop(id);
        streamList[index].close();
        streamList.splice(index, 1);
        return 1;
      }
      return 0;
    });

    this.remoteMuteAudios[id] = false;
    this.remoteMuteVideos[id] = false;
    this.streams = streamList;
    if (!this.mainStream || this.mainStream.getId() === id) {
      const [mainStream] = this.streams;
      this.mainStream = mainStream;
    }

    if (this.activeSpeaker === id && this.mainStream) {
      this.updateActiveSpeaker(0);
    }

    this.emit('stream-removed', { id });
  }

  setHighStream(prev, next) {
    if (prev === next) {
      return;
    }
    const { streams, client } = this;
    let prevStream;
    let nextStream;
    // Get stream by id
    for (const stream of streams) {
      const id = stream.getId();
      if (id === prev) {
        prevStream = stream;
      } else if (id === next) {
        nextStream = stream;
      } else {
        // Do nothing
      }
    }
    // Set prev stream to low
    prevStream && client.setRemoteVideoStreamType(prevStream, 1);
    // Set next stream to high
    nextStream && client.setRemoteVideoStreamType(nextStream, 0);
    this.mainStream = nextStream;
  }

  publishStream({ attendeeMode, videoProfile, cameraId, microphoneId }) {
    const { client } = this;
    const { uid } = this;
    const config = isSafari()
      ? {}
      : {
          cameraId,
          microphoneId,
        };
    const localStream = this.streamInit(
      this.uid,
      { attendeeMode, videoProfile },
      config,
    );
    this.localStream = localStream;
    localStream.init(
      () => {
        if (attendeeMode !== 'audience') {
          if (this.uplinkNetworkQuality > 3) {
            //  localStream.muteVideo();
          }
          client.publish(localStream, (err, status) => {});
          // this.addStream(localStream, true);
          this.addLocalStreamSubscriber(localStream.getId());
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
        window.debugLogger && window.debugLogger.add(err, 'error');
      },
    );
  }

  addLocalStreamSubscriber(id) {
    this.removeLocalStreamSubscriber(id);
    this.localStreamSubscribed.push(id);
  }

  removeLocalStreamSubscriber(id) {
    this.localStreamSubscribed = this.localStreamSubscribed.filter(
      rowId => rowId !== id,
    );
  }

  infoDetectSchedule() {
    if (
      !window.debugLogger &&
      !['test', 'dev'].includes(process.env.REACT_APP_ENV)
    ) {
      return;
    }
    const DURATION = 10;
    setInterval(() => {
      const streamList = this.getStreams();
      const { localStream } = this;
      const no = streamList.length;
      for (let i = 0; i < no; i++) {
        const item = streamList[i];
        const id = item.getId();
        let videoBytes;

        let audioBytes;

        let videoPackets;

        let audioPackets;

        let videoPacketsLost;

        let audioPacketsLost;
        item.getStats(stats => {
          let str = `Stream Id: ${id}`;
          if (localStream && id === localStream.getId()) {
            str += `
              <p>Local Stream accessDelay: ${stats.accessDelay}</p>
              <p>Local Stream audioSendBytes: ${stats.audioSendBytes}</p>
              <p>Local Stream audioSendPackets: ${stats.audioSendPackets}</p>
              <p>Local Stream audioSendPacketsLost: ${
                stats.audioSendPacketsLost
              }</p>
              <p>Local Stream videoSendBytes: ${stats.videoSendBytes}</p>
              <p>Local Stream videoSendFrameRate: ${
                stats.videoSendFrameRate
              }</p>
              <p>Local Stream videoSendPackets: ${stats.videoSendPackets}</p>
              <p>Local Stream videoSendPacketsLost: ${
                stats.videoSendPacketsLost
              }</p>
              <p>Local Stream videoSendResolutionHeight: ${
                stats.videoSendResolutionHeight
              }</p>
              <p>Local Stream videoSendResolutionWidth: ${
                stats.videoSendResolutionWidth
              }</p>
            `;
          } else {
            videoBytes = stats.videoReceiveBytes;
            audioBytes = stats.audioReceiveBytes;
            videoPackets = stats.videoReceivePackets;
            audioPackets = stats.audioReceivePackets;
            videoPacketsLost = stats.videoReceivePacketsLost;
            audioPacketsLost = stats.audioReceivePacketsLost;
            str += `
              <p>Remote Stream accessDelay: ${stats.accessDelay}</p>
              <p>Remote Stream audioReceiveBytes: ${stats.audioReceiveBytes}</p>
              <p>Remote Stream audioReceiveDelay: ${stats.audioReceiveDelay}</p>
              <p>Remote Stream audioReceivePackets: ${
                stats.audioReceivePackets
              }</p>
              <p>Remote Stream audioReceivePacketsLost: ${
                stats.audioReceivePacketsLost
              }</p>
              <p>Remote Stream endToEndDelay: ${stats.endToEndDelay}</p>
              <p>Remote Stream videoReceiveBytes: ${stats.videoReceiveBytes}</p>
              <p>Remote Stream videoReceiveDecodeFrameRate: ${
                stats.videoReceiveDecodeFrameRate
              }</p>
              <p>Remote Stream videoReceiveDelay: ${stats.videoReceiveDelay}</p>
              <p>Remote Stream videoReceiveFrameRate: ${
                stats.videoReceiveFrameRate
              }</p>
              <p>Remote Stream videoReceivePackets: ${
                stats.videoReceivePackets
              }</p>
              <p>Remote Stream videoReceivePacketsLost: ${
                stats.videoReceivePacketsLost
              }</p>
              <p>Remote Stream videoReceiveResolutionHeight: ${
                stats.videoReceiveResolutionHeight
              }</p>
              <p>Remote Stream videoReceiveResolutionWidth: ${
                stats.videoReceiveResolutionWidth
              }</p>
            `;
            // Do calculate
            const videoBitrate = `${(videoBytes / 1000 / DURATION).toFixed(
              2,
            )}KB/s`;
            const audioBitrate = `${(audioBytes / 1000 / DURATION).toFixed(
              2,
            )}KB/s`;

            const vPacketLoss = `${(
              (videoPacketsLost / videoPackets) *
              100
            ).toFixed(2)}%`;
            const aPacketLoss = `${(
              (audioPacketsLost / audioPackets) *
              100
            ).toFixed(2)}%`;
            const sumPacketLoss = (
              (videoPacketsLost / videoPackets) * 100 +
              (audioPacketsLost / audioPackets) * 100
            ).toFixed(2);

            const videoCardHtml = `<p>Video Bitrate:${videoBitrate} Packet Loss: ${vPacketLoss}</p>`;
            const audioCardHtml = `<p>Audio Bitrate: ${audioBitrate} Packet Loss: ${aPacketLoss}</p>`;
            let qualityHtml;
            if (sumPacketLoss < 1) {
              qualityHtml = 'Excellent';
            } else if (sumPacketLoss < 5) {
              qualityHtml = 'Good';
            } else if (sumPacketLoss < 10) {
              qualityHtml = 'Poor';
            } else if (sumPacketLoss < 100) {
              qualityHtml = 'Bad';
            } else {
              qualityHtml = 'Get media failed.';
            }
            qualityHtml = `<p>Quality: ${qualityHtml}</p>`;
            str += videoCardHtml + audioCardHtml + qualityHtml;
          }

          window.debugLogger.add(str);
        });
      }
    }, DURATION * 1000);
  }

  reset() {
    this.channelName = null;
    this.localStream = null;
    this.streams = [];
    this.localStreamSubscribed = [];
    this.remoteMuteVideos = {};
    this.remoteMuteAudios = {};
  }

  leaveChannel(callback = null) {
    const { localStream, client, channelName } = this;
    if (!channelName || !client) {
      if (callback) {
        callback();
      }
      return;
    }
    if (localStream) {
      client.unpublish(localStream);
      localStream.close();
    }
    client.leave(() => {
      this.reset();
      if (callback) {
        // callback();
        setTimeout(callback, 100);
      }
    });
  }
}
