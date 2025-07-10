import ApiService from '../network/axios';

export interface Params {
  limit: number;
}

class PostService {
  static get(params: Params) {
    return ApiService.get('/posts', { params });
  }
}

export default PostService;
