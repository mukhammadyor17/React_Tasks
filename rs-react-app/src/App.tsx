import { Component } from 'react';
import { getPosts } from './queries/get_posts';
import { searchPosts } from './queries/search_posts';
import { type Post } from './models/post.interface';

import CardList from './components/card_list/CardList';
import SearchBar from './components/search_bar/SearchBar';

interface AppState {
  data: Post[];
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  query: string;
}

class App extends Component<unknown, AppState> {
  state: AppState = {
    data: [],
    error: null,
    isLoading: false,
    isError: false,
    query: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch(query: string) {
    this.setState({ query }, () => {
      this.searchData();
    });
  }

  setError() {
    if (this.state.isError) {
      this.setState({
        isError: false,
        error: null,
      });
    } else {
      this.setState({
        isError: true,
        error: { message: 'Something went wrong...' } as Error,
      });
    }
  }

  searchData = async () => {
    try {
      this.setState({ isLoading: true, isError: false });
      const data = await searchPosts({ limit: 20, q: this.state.query });
      this.setState({ data: data.posts, isLoading: false, isError: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error : new Error('Unknown error'),
        isLoading: false,
        isError: true,
      });
    }
  };

  getData = async () => {
    try {
      this.setState({ isLoading: true, isError: false });
      const data = await getPosts({ limit: 20 });
      this.setState({ data: data.posts, isLoading: false, isError: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error : new Error('Unknown error'),
        isLoading: false,
        isError: true,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { isLoading, isError } = this.state;

    return (
      <div className="bg-indigo-50 h-screen flex justify-center items-center flex-col gap-2">
        <SearchBar
          value={this.state.query}
          onChange={this.handleInputChange}
          onSearch={(query: string) => this.handleSearch(query)}
        />
        <CardList
          posts={this.state.data}
          isLoading={isLoading}
          isError={isError}
        />
        <div className="w-full flex justify-end mb-10 px-10">
          <button
            className="border border-red-400 px-4 py-2"
            onClick={() => this.setError()}
          >
            Show Error
          </button>
        </div>
      </div>
    );
  }
}

export default App;
