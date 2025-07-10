import type { Params } from '../services/post_service';
import PostService from '../services/post_service';

export const getPosts = async (payload: Params) => {
  try {
    const { data } = await PostService.get(payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
