import { describe, it, vi, expect, beforeEach } from 'vitest';
import { downloadFile } from './downloadCsv';
import type { FavoritePost } from '../store/features/favorites/favorites_slice';

describe('downloadFile', () => {
  const mockClick = vi.fn();
  const mockSetAttribute = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: mockSetAttribute,
      click: mockClick,
    } as unknown as HTMLAnchorElement);

    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:url'),
    });
  });

  it('calls document.createElement and triggers download', () => {
    const mockData: FavoritePost[] = [
      { id: 1, title: 'Test title', body: 'Test body' },
    ];

    downloadFile(mockData);

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockSetAttribute).toHaveBeenCalledWith('download', '1_items.csv');
    expect(mockClick).toHaveBeenCalled();
  });
});
