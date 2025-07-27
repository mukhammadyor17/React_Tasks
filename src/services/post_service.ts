import ApiService from '../network/axios';

export interface Params {
  limit: number;
  skip?: number;
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

  static getById(id: string) {
    return ApiService.get(`/posts/${id}`);
  }
}

export default PostService;
