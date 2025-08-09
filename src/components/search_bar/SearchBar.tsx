import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
  onRefetch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onRefetch,
}) => {
  const handleClick = () => {
    onSearch(value.trim());
    localStorage.setItem('searchQuery', value.trim());
  };

  return (
    <header className="px-10 py-5 w-full bg-white dark:bg-gray-800 shadow-xs border-b border-gray-200 dark:border-gray-700">
      <div className="flex gap-4 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
          value={value}
          onChange={onChange}
        />
        <button
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded active:bg-indigo-700 dark:active:bg-indigo-800 transition-colors"
          onClick={handleClick}
        >
          Search
        </button>
        <div
          className="cursor-pointer ml-auto px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded active:bg-indigo-700 dark:active:bg-indigo-800 transition-colors"
          onClick={onRefetch}
        >
          Refresh
        </div>
      </div>
    </header>
  );
};

export default SearchBar;
