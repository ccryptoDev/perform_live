import { AbstractApiService } from './abstract-service';

export default class PerformerService extends AbstractApiService {
  getPerformanceState = state => this.api.get(`/performance/${state}`);

  getPerformance = () => this.api.get(`/performance`);

  getPerformanceIdId = id => this.api.get(`/performance/id/${id}`);

  getPerformanceIdIdPreview = id =>
    this.api.get(`/performance/id/${id}/preview`);

  getPerformanceIdIdPerformer = id =>
    this.api.get(`/performance/id/${id}/performer`);

  getPerformanceIdIdCategories = id =>
    this.api.get(`/performance/id/${id}/categories`);

  getPerformanceIdIdProduct = (id, params) =>
    this.api.get(`/performance/id/${id}/product`, { params });

  getPerformanceIdIdProductProductIdGallery = (id, productId) =>
    this.api.get(`/performance/id/${id}/product/${productId}/gallery`);

  getPerformanceIdIdLikesCount = id =>
    this.api.get(`/performance/id/${id}/likesCount`);

  getPerformanceCategories = () => this.api.get(`/performance/categories`);

  getPerformanceCategoriesType = type =>
    this.api.get(`/performance/categories/${type}`);

  getPerformanceCurrentTime = () => this.api.get(`/performance/currentTime`);

  postPerformer = body => this.api.post(`/performer`, body);

  getPerformer = () => this.api.get(`/performer`);

  putPerformer = body => this.api.put(`/performer`, body);

  postPerformerIdIdFollow = (id, body) =>
    this.api.post(`/performer/id/${id}/follow`, body);

  getPerformerIdIdFollow = id => this.api.get(`/performer/id/${id}/follow`);

  getPerformerFollowedByMe = () => this.api.get(`/performer/followedByMe`);

  getPerformerFollowedByMeCount = () =>
    this.api.get(`/performer/followedByMe/count`);

  getPerformerFollowersCount = () => this.api.get(`/performer/followers/count`);

  getPerformerFollowers = () => this.api.get(`/performer/followers`);

  getPerformerTagOptions = () => this.api.get(`/performer/tag/options`);

  postPerformerPhone = body => this.api.post(`/performer/phone`, body);

  postPerformerPerformance = body =>
    this.api.post(`/performer/performance`, body);

  getPerformerPerformance = () => this.api.get(`/performer/performance`);

  getPerformerPerformanceState = state =>
    this.api.get(`/performer/performance/${state}`);

  getPerformerPerformanceIdId = id =>
    this.api.get(`/performer/performance/id/${id}`);

  putPerformerPerformanceIdId = (id, body) =>
    this.api.put(`/performer/performance/id/${id}`, body);

  deletePerformerPerformanceIdId = (id, body) =>
    this.api.delete(`/performer/performance/id/${id}`, body);

  putPerformerPerformanceIdIdStart = (id, body) =>
    this.api.put(`/performer/performance/id/${id}/start`, body);

  putPerformerPerformanceIdIdFinish = (id, body) =>
    this.api.put(`/performer/performance/id/${id}/finish`, body);

  postPerformerPerformanceIdIdPreview = (id, body) =>
    this.api.post(`/performer/performance/id/${id}/preview`, body);

  getPerformerPerformanceIdIdPreview = id =>
    this.api.get(`/performer/performance/id/${id}/preview`);

  deletePerformerPerformanceIdIdPreview = (id, body) =>
    this.api.delete(`/performer/performance/id/${id}/preview`, body);

  getPerformerPerformanceIdIdCategories = id =>
    this.api.get(`/performer/performance/id/${id}/categories`);

  postPerformerPerformanceIdIdProductProductId = (id, productId, body) =>
    this.api.post(`/performer/performance/id/${id}/product/${productId}`, body);

  deletePerformerPerformanceIdIdProductProductId = (id, productId, body) =>
    this.api.delete(
      `/performer/performance/id/${id}/product/${productId}`,
      body,
    );

  getPerformerPerformanceIdIdProduct = id =>
    this.api.get(`/performer/performance/id/${id}/product`);

  getPerformerPerformanceCategoriesType = type =>
    this.api.get(`/performer/performance/categories/${type}`);

  getPerformerPerformanceRegister = () =>
    this.api.get(`/performer/performance/register`);

  getPerformerPerformanceIdIdRegister = id =>
    this.api.get(`/performer/performance/id/${id}/register`);

  postPerformerPerformanceIdIdRegister = id =>
    this.api.post(`/performer/performance/id/${id}/register`);

  getPerformerPerformanceIdIdregisteredToMyPerformance = id =>
    this.api.get(`/performer/performance/id/${id}/registeredToMyPerformance`);

  getPerformerPerformanceCount = () =>
    this.api.get(`/performer/performance/count`);

  postPerformerPerformanceIdIdLike = (id, body) =>
    this.api.post(`/performer/performance/id/${id}/like`, body);

  getPerformerPerformanceIdIdLike = id =>
    this.api.get(`/performer/performance/id/${id}/like`);

  getPerformerPerformanceLikedByMe = (pageParam, quantity = 10, performer) => {
    const queryParams =
      pageParam || pageParam === 0
        ? { params: { page: pageParam, size: quantity, performer } }
        : {};
    return this.api.get(`/performer/performance/likedByMe`, queryParams);
  };

  postPerformerProduct = body => this.api.post(`/performer/product`, body);

  getPerformerProduct = params =>
    this.api.get(`/performer/product`, { params });

  getPerformerProductIdId = (id, params) =>
    this.api.get(`/performer/product/id/${id}`, { params });

  putPerformerProductIdId = (id, body) =>
    this.api.put(`/performer/product/id/${id}`, body);

  deletePerformerProductIdId = (id, body) =>
    this.api.delete(`/performer/product/id/${id}`, body);

  getPerformerProductIdIdCategories = id =>
    this.api.get(`/performer/product/id/${id}/categories`);

  postPerformerProductIdIdGallery = (id, body) =>
    this.api.post(`/performer/product/id/${id}/gallery`, body);

  getPerformerProductIdIdGallery = id =>
    this.api.get(`/performer/product/id/${id}/gallery`);

  putPerformerProductIdIdGallery = (id, body) =>
    this.api.put(`/performer/product/id/${id}/gallery`, body);

  deletePerformerProductIdIdGalleryGalleryId = ({ id, galleryId }) =>
    this.api.delete(`/performer/product/id/${id}/gallery/${galleryId}`);

  getPerformerProductPackages = () =>
    this.api.get(`/performer/product/packages`);

  getPerformerPublicTagTag = tag =>
    this.api.get(`/performer/public/tag/${tag}`);

  getPerformerPublicTagTagAvailable = tag =>
    this.api.get(`/performer/public/tag/${tag}/available`);

  getPerformerPublicId = id => this.api.get(`/performer/public/${id}`);

  getPerformerPublicIdFollowsCount = id =>
    this.api.get(`/performer/public/${id}/follows/count`);

  getPerformerPublicIdFollowersCount = id =>
    this.api.get(`/performer/public/${id}/followers/count`);

  getPerformerPublicIdPerformancesCount = id =>
    this.api.get(`/performer/public/${id}/performances/count`);

  // email and phone verify
  postPerformerEmail = body => this.api.post(`/performer/email`, body);

  postPerformerPhone = body => this.api.post(`/performer/phone`, body);

  getPerformancePurchasesType = type =>
    this.api.get(`/performance/purchases/${type}`);

  putPerformerPerformanceIdIdWatch = id =>
    this.api.put(`/performer/performance/id/${id}/watch`);

  getPerformerAnalytics = () => this.api.get('/performer/analytics/');
}
