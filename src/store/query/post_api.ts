import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Params, SearchParams } from '../../services/post_service';

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

interface PostListResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (build) => ({
    getPosts: build.query<PostListResponse, Params>({
      query: (params) => ({
        url: '/posts',
        params,
      }),
    }),
    searchPosts: build.query<PostListResponse, SearchParams>({
      query: (params) => ({
        url: '/posts/search',
        params,
      }),
    }),
    getById: build.query<Post, string>({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useSearchPostsQuery, useGetByIdQuery } =
  postApi;
