import type { SearchParams } from '../services/post_service';
import PostService from '../services/post_service';

export const searchPosts = async (payload: SearchParams) => {
  try {
    const { data } = await PostService.search(payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
