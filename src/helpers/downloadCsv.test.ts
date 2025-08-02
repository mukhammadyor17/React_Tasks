import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { downloadFile } from './downloadCsv';
import type { FavoritePost } from '../store/features/favorites/favorites_slice';

// Mock DOM APIs
const mockCreateElement = vi.fn();
const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

// Mock URL.createObjectURL and URL.revokeObjectURL
Object.defineProperty(global, 'URL', {
  value: {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL,
  },
  writable: true,
});

// Mock document.createElement
Object.defineProperty(global, 'document', {
  value: {
    createElement: mockCreateElement,
  },
  writable: true,
});

describe('downloadCsv', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the anchor element
    const mockAnchor = {
      href: '',
      setAttribute: vi.fn(),
      click: vi.fn(),
    };
    mockCreateElement.mockReturnValue(mockAnchor);

    // Mock URL.createObjectURL to return a mock URL
    mockCreateObjectURL.mockReturnValue('mock-url');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('downloadFile', () => {
    it('creates a CSV file with correct data when favorites are provided', () => {
      const mockFavorites: FavoritePost[] = [
        { id: 1, title: 'Test Post 1', body: 'Test body 1' },
        { id: 2, title: 'Test Post 2', body: 'Test body 2' },
      ];

      downloadFile(mockFavorites);

      // Check that createElement was called with 'a'
      expect(mockCreateElement).toHaveBeenCalledWith('a');

      // Check that URL.createObjectURL was called with a Blob
      expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
      const blobCall = mockCreateObjectURL.mock.calls[0][0];
      expect(blobCall).toBeInstanceOf(Blob);
      expect(blobCall.type).toBe('text/csv;charset=utf-8;');

      // Check the blob content
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        expect(content).toContain('Favorite posts');
        expect(content).toContain(' 1. Test Post 1. Test body 1');
        expect(content).toContain(' 2. Test Post 2. Test body 2');
      };
      reader.readAsText(blobCall);
    });

    it('creates a CSV file with empty data when no favorites are provided', () => {
      const mockFavorites: FavoritePost[] = [];

      downloadFile(mockFavorites);

      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);

      const blobCall = mockCreateObjectURL.mock.calls[0][0];
      expect(blobCall).toBeInstanceOf(Blob);
      expect(blobCall.type).toBe('text/csv;charset=utf-8;');

      // Check the blob content for empty data
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        expect(content).toBe('Favorite posts\n');
      };
      reader.readAsText(blobCall);
    });

    it('sets correct download attribute with filename based on data length', () => {
      const mockFavorites: FavoritePost[] = [
        { id: 1, title: 'Test Post 1', body: 'Test body 1' },
        { id: 2, title: 'Test Post 2', body: 'Test body 2' },
      ];

      const mockAnchor = {
        href: '',
        setAttribute: vi.fn(),
        click: vi.fn(),
      };
      mockCreateElement.mockReturnValue(mockAnchor);

      downloadFile(mockFavorites);

      expect(mockAnchor.setAttribute).toHaveBeenCalledWith(
        'download',
        '2_items.csv'
      );
    });

    it('sets correct download attribute for empty data', () => {
      const mockFavorites: FavoritePost[] = [];

      const mockAnchor = {
        href: '',
        setAttribute: vi.fn(),
        click: vi.fn(),
      };
      mockCreateElement.mockReturnValue(mockAnchor);

      downloadFile(mockFavorites);

      expect(mockAnchor.setAttribute).toHaveBeenCalledWith(
        'download',
        '0_items.csv'
      );
    });

    it('sets the href to the created object URL', () => {
      const mockFavorites: FavoritePost[] = [
        { id: 1, title: 'Test Post 1', body: 'Test body 1' },
      ];

      const mockAnchor = {
        href: '',
        setAttribute: vi.fn(),
        click: vi.fn(),
      };
      mockCreateElement.mockReturnValue(mockAnchor);

      downloadFile(mockFavorites);

      expect(mockAnchor.href).toBe('mock-url');
    });

    it('triggers the download by clicking the anchor element', () => {
      const mockFavorites: FavoritePost[] = [
        { id: 1, title: 'Test Post 1', body: 'Test body 1' },
      ];

      const mockAnchor = {
        href: '',
        setAttribute: vi.fn(),
        click: vi.fn(),
      };
      mockCreateElement.mockReturnValue(mockAnchor);

      downloadFile(mockFavorites);

      expect(mockAnchor.click).toHaveBeenCalledTimes(1);
    });

    it('handles special characters in title and body correctly', () => {
      const mockFavorites: FavoritePost[] = [
        {
          id: 1,
          title: 'Test Post with "quotes" and \'apostrophes\'',
          body: 'Test body with \n newlines and \t tabs',
        },
      ];

      downloadFile(mockFavorites);

      const blobCall = mockCreateObjectURL.mock.calls[0][0];
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        expect(content).toContain(
          'Test Post with "quotes" and \'apostrophes\''
        );
        expect(content).toContain('Test body with \n newlines and \t tabs');
      };
      reader.readAsText(blobCall);
    });

    it('handles large number of items correctly', () => {
      const mockFavorites: FavoritePost[] = Array.from(
        { length: 100 },
        (_, i) => ({
          id: i + 1,
          title: `Post ${i + 1}`,
          body: `Body ${i + 1}`,
        })
      );

      downloadFile(mockFavorites);

      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);

      const blobCall = mockCreateObjectURL.mock.calls[0][0];
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const lines = content.split('\n');
        expect(lines).toHaveLength(101); // 1 header + 100 items
        expect(lines[0]).toBe('Favorite posts');
        expect(lines[1]).toBe(' 1. Post 1. Body 1');
        expect(lines[100]).toBe(' 100. Post 100. Body 100');
      };
      reader.readAsText(blobCall);
    });
  });
});
