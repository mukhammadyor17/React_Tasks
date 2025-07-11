import ApiService from '../network/axios';

export interface Params {
  limit: number;
}

export interface SearchParams {
  limit: number;
  q: string;
}

class PostService {
  static get(params: Params) {
    return ApiService.get('/posts', { params });
  }

  static search(params: SearchParams) {
    return ApiService.get('/posts/search', { params });
  }
}

export default PostService;
