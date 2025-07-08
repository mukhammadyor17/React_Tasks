import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface SearchBarState {
  searchQuery: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleClick = () => {
    this.props.onSearch(this.state.searchQuery.trim());
  };

  render(): React.ReactNode {
    const { searchQuery } = this.state;
    return (
      <header className="px-10 py-5 w-full bg-white shadow-xs">
        <div className="flex gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded"
            value={searchQuery}
            onChange={this.handleInputChange}
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
