import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { addNewUser, type User } from './userSlice';

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

describe('userSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    vi.spyOn(Date, 'now').mockReturnValue(1234567890000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should have the correct initial state', () => {
      const state = store.getState().user;

      expect(state).toEqual({
        users: [],
      });
    });

    it('should have empty users array initially', () => {
      const state = store.getState().user;
      expect(state.users).toHaveLength(0);
    });
  });

  describe('actions and action creators', () => {
    it('should create addNewUser action with correct payload', () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
        country: 'US',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male',
        file: 'profile.jpg',
        accept: true,
      };

      const action = addNewUser(mockUser);

      expect(action.type).toBe('user/addNewUser');
      expect(action.payload).toEqual(mockUser);
    });

    it('should have correct action type', () => {
      const action = addNewUser({} as User);
      expect(action.type).toBe('user/addNewUser');
    });
  });

  describe('reducers', () => {
    it('should handle addNewUser action correctly', () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
        country: 'US',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male',
        file: 'profile.jpg',
        accept: true,
      };

      const initialState = store.getState().user;
      expect(initialState.users).toHaveLength(0);

      store.dispatch(addNewUser(mockUser));

      const newState = store.getState().user;
      expect(newState.users).toHaveLength(1);
      expect(newState.users[0]).toEqual({
        ...mockUser,
        timestamp: 1234567890000,
      });
    });

    it('should add new user to the beginning of the array', () => {
      const firstUser = {
        id: 1,
        name: 'First User',
        age: 25,
        email: 'first@example.com',
        country: 'US',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male',
        file: 'profile1.jpg',
        accept: true,
      };

      const secondUser = {
        id: 2,
        name: 'Second User',
        age: 30,
        email: 'second@example.com',
        country: 'CA',
        password: 'password456',
        confirmPassword: 'password456',
        gender: 'female',
        file: 'profile2.jpg',
        accept: true,
      };

      store.dispatch(addNewUser(firstUser));

      store.dispatch(addNewUser(secondUser));

      const state = store.getState().user;
      expect(state.users).toHaveLength(2);
      expect(state.users[0]).toEqual({
        ...secondUser,
        timestamp: 1234567890000,
      });
      expect(state.users[1]).toEqual({
        ...firstUser,
        timestamp: 1234567890000,
      });
    });

    it('should maintain immutability when adding users', () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
        country: 'US',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male',
        file: 'profile.jpg',
        accept: true,
      };

      const initialState = store.getState().user;
      const initialUsers = [...initialState.users];

      store.dispatch(addNewUser(mockUser));

      const newState = store.getState().user;
      expect(newState.users).not.toBe(initialUsers);
      expect(newState.users).toHaveLength(1);
    });

    it('should return the same state for unknown actions', () => {
      const initialState = store.getState().user;

      store.dispatch({ type: 'unknown/action' });

      const newState = store.getState().user;
      expect(newState).toEqual(initialState);
    });
  });

  describe('selectors', () => {
    it('should select users array from state', () => {
      const state = store.getState();
      const users = state.user.users;

      expect(users).toEqual([]);
    });

    it('should select specific user by id', () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
        country: 'US',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male',
        file: 'profile.jpg',
        accept: true,
      };

      store.dispatch(addNewUser(mockUser));

      const state = store.getState();
      const user = state.user.users.find((u) => u.id === 1);

      expect(user).toEqual({
        ...mockUser,
        timestamp: 1234567890000,
      });
    });

    it('should return undefined for non-existent user id', () => {
      const state = store.getState();
      const user = state.user.users.find((u) => u.id === 999);

      expect(user).toBeUndefined();
    });

    it('should select users by country', () => {
      const user1 = {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
        country: 'US',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male',
        file: 'profile1.jpg',
        accept: true,
      };

      const user2 = {
        id: 2,
        name: 'Jane Smith',
        age: 30,
        email: 'jane@example.com',
        country: 'CA',
        password: 'password456',
        confirmPassword: 'password456',
        gender: 'female',
        file: 'profile2.jpg',
        accept: true,
      };

      store.dispatch(addNewUser(user1));
      store.dispatch(addNewUser(user2));

      const state = store.getState();
      const usUsers = state.user.users.filter((u) => u.country === 'US');
      const caUsers = state.user.users.filter((u) => u.country === 'CA');

      expect(usUsers).toHaveLength(1);
      expect(caUsers).toHaveLength(1);
      expect(usUsers[0].name).toBe('John Doe');
      expect(caUsers[0].name).toBe('Jane Smith');
    });
  });

  describe('store state updates after form submissions', () => {
    it('should add user with timestamp when form is submitted', () => {
      const formData = {
        id: 1,
        name: 'Form User',
        age: 28,
        email: 'form@example.com',
        country: 'UK',
        password: 'formpass123',
        confirmPassword: 'formpass123',
        gender: 'other',
        file: 'form-profile.jpg',
        accept: true,
      };

      store.dispatch(addNewUser(formData));

      const state = store.getState().user;
      expect(state.users).toHaveLength(1);
      expect(state.users[0].timestamp).toBe(1234567890000);
      expect(state.users[0].name).toBe('Form User');
      expect(state.users[0].country).toBe('UK');
    });

    it('should handle multiple form submissions correctly', () => {
      const users = [
        {
          id: 1,
          name: 'User 1',
          age: 25,
          email: 'user1@example.com',
          country: 'US',
          password: 'pass1',
          confirmPassword: 'pass1',
          gender: 'male',
          file: 'file1.jpg',
          accept: true,
        },
        {
          id: 2,
          name: 'User 2',
          age: 30,
          email: 'user2@example.com',
          country: 'CA',
          password: 'pass2',
          confirmPassword: 'pass2',
          gender: 'female',
          file: 'file2.jpg',
          accept: true,
        },
        {
          id: 3,
          name: 'User 3',
          age: 35,
          email: 'user3@example.com',
          country: 'UK',
          password: 'pass3',
          confirmPassword: 'pass3',
          gender: 'other',
          file: 'file3.jpg',
          accept: true,
        },
      ];

      users.forEach((user) => {
        store.dispatch(addNewUser(user));
      });

      const state = store.getState().user;
      expect(state.users).toHaveLength(3);

      expect(state.users[0].name).toBe('User 3');
      expect(state.users[1].name).toBe('User 2');
      expect(state.users[2].name).toBe('User 1');

      state.users.forEach((user) => {
        expect(user.timestamp).toBe(1234567890000);
      });
    });

    it('should preserve all user data from form submission', () => {
      const formData = {
        id: 999,
        name: 'Complete User',
        age: 42,
        email: 'complete@example.com',
        country: 'DE',
        password: 'completepass',
        confirmPassword: 'completepass',
        gender: 'male',
        file: 'complete-profile.jpg',
        accept: true,
      };

      store.dispatch(addNewUser(formData));

      const state = store.getState().user;
      const addedUser = state.users[0];

      expect(addedUser.id).toBe(999);
      expect(addedUser.name).toBe('Complete User');
      expect(addedUser.age).toBe(42);
      expect(addedUser.email).toBe('complete@example.com');
      expect(addedUser.country).toBe('DE');
      expect(addedUser.password).toBe('completepass');
      expect(addedUser.confirmPassword).toBe('completepass');
      expect(addedUser.gender).toBe('male');
      expect(addedUser.file).toBe('complete-profile.jpg');
      expect(addedUser.accept).toBe(true);
      expect(addedUser.timestamp).toBe(1234567890000);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle user with minimal required data', () => {
      const minimalUser = {
        id: 1,
        name: '',
        age: 0,
        email: '',
        country: '',
        password: '',
        confirmPassword: '',
        gender: '',
        file: '',
        accept: false,
      };

      store.dispatch(addNewUser(minimalUser));

      const state = store.getState().user;
      expect(state.users).toHaveLength(1);
      expect(state.users[0]).toEqual({
        ...minimalUser,
        timestamp: 1234567890000,
      });
    });

    it('should handle user with special characters in name', () => {
      const specialUser = {
        id: 1,
        name: "José María O'Connor-Smith",
        age: 45,
        email: 'jose@example.com',
        country: 'ES',
        password: 'pass123',
        confirmPassword: 'pass123',
        gender: 'male',
        file: 'jose-profile.jpg',
        accept: true,
      };

      store.dispatch(addNewUser(specialUser));

      const state = store.getState().user;
      expect(state.users[0].name).toBe("José María O'Connor-Smith");
    });

    it('should handle very long email addresses', () => {
      const longEmail = 'a'.repeat(100) + '@' + 'b'.repeat(100) + '.com';
      const longEmailUser = {
        id: 1,
        name: 'Long Email User',
        age: 30,
        email: longEmail,
        country: 'US',
        password: 'pass123',
        confirmPassword: 'pass123',
        gender: 'female',
        file: 'long-email.jpg',
        accept: true,
      };

      store.dispatch(addNewUser(longEmailUser));

      const state = store.getState().user;
      expect(state.users[0].email).toBe(longEmail);
    });
  });

  describe('performance and memory', () => {
    it('should handle large number of users efficiently', () => {
      const largeUserList = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        age: 20 + (index % 50),
        email: `user${index + 1}@example.com`,
        country: ['US', 'CA', 'UK', 'DE', 'FR'][index % 5],
        password: `pass${index + 1}`,
        confirmPassword: `pass${index + 1}`,
        gender: ['male', 'female', 'other'][index % 3],
        file: `profile${index + 1}.jpg`,
        accept: true,
      }));

      largeUserList.forEach((user) => {
        store.dispatch(addNewUser(user));
      });

      const state = store.getState().user;
      expect(state.users).toHaveLength(1000);
      expect(state.users[0].id).toBe(1000);
      expect(state.users[999].id).toBe(1);
    });
  });
});
