import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
}

class SearchBar extends React.Component<SearchBarProps> {
  handleClick = () => {
    this.props.onSearch(this.props.value.trim());
    localStorage.setItem('searchQuery', this.props.value.trim());
  };

  render(): React.ReactNode {
    const { value, onChange } = this.props;
    return (
      <header className="px-10 py-5 w-full bg-white shadow-xs">
        <div className="flex gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded"
            value={value}
            onChange={onChange}
          />
          <button
            className="px-6 py-2 bg-indigo-500 text-white rounded active:bg-indigo-600 hover:bg-indigo-700 transition-colors"
            onClick={this.handleClick}
          >
            Search
          </button>
        </div>
      </header>
    );
  }
}

export default SearchBar;
