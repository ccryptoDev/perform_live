import { AbstractApiService } from './abstract-service';

export default class FileService extends AbstractApiService {
  postFileUpload = body => this.api.post(`/file/upload`, body);

  postFileUploadMultiple = body =>
    this.api.post(`/file/upload/multiple`, body, {
      headers: { 'Content-Type': null },
    });

  getFileResize = params => this.api.get('/file/resize', { params });
}
