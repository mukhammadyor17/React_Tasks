import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// setupTests.ts
import { server } from '../src/queries/mocks/server';

// before all tests
beforeAll(() => server.listen());

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// clean up after tests
afterAll(() => server.close());
