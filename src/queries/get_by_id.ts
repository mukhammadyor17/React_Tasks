import PostService from '../services/post_service';

export const getPostById = async (id: string) => {
  try {
    const { data } = await PostService.getById(id);
    return data;
  } catch (error) {
    console.error(error);
  }
};
