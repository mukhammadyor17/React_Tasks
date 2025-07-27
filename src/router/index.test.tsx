import { router } from './index';
import type { RouteObject } from 'react-router';

describe('App router', () => {
  it('should have a root path', () => {
    const root = router.routes.find((r: RouteObject) => r.path === '/');
    expect(root).toBeDefined();
    expect(
      root?.children?.some((child: RouteObject) => child.path === 'post/:id')
    ).toBe(false);
  });
});
