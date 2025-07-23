// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://dummyjson.com/posts', () => {
    return HttpResponse.json({
      posts: [
        {
          id: 1,
          title: 'Test title',
          body: 'Lorem ipsum dolor amet',
        },
      ],
    });
  }),
];
