import { vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './use_local_storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window.localStorage.__proto__, 'getItem');
    vi.spyOn(window.localStorage.__proto__, 'setItem');
  });

  it('should return initial value if no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    const [value] = result.current;
    expect(value).toBe('default');
  });

  it('should read value from localStorage if available', () => {
    localStorage.setItem('key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    const [value] = result.current;
    expect(value).toBe('stored');
  });

  it('should update state and write to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));

    act(() => {
      const [, setValue] = result.current;
      setValue('new value');
    });

    const [value] = result.current;
    expect(value).toBe('new value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'key',
      JSON.stringify('new value')
    );
  });
});
