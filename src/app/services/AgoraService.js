import { AbstractApiService } from './abstract-service';

export default class AgoraService extends AbstractApiService {
  getAgoraVideoStreamToken = () => this.api.get(`/agora/videoStreamToken`);

  getAgoraChatToken = () => this.api.get(`/agora/chatToken`);

  postAgoraStartRecording = body =>
    this.api.post(`/agora/startRecording`, body);

  postAgoraStopRecording = body => this.api.post(`/agora/stopRecording`, body);
}
