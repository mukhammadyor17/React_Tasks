import { Component } from 'react';
import { getPosts } from '../queries/get_posts';
import { searchPosts } from '../queries/search_posts';
import { type Post } from '../models/post.interface';

import CardList from '../components/card_list/CardList';
import SearchBar from '../components/search_bar/SearchBar';

interface HomePageState {
  data: Post[];
  query: string;
  isError: boolean;
  isLoading: boolean;
  showError: boolean;
}

class HomePage extends Component<unknown, HomePageState> {
  state: HomePageState = {
    data: [],
    query: '',
    isError: false,
    isLoading: false,
    showError: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch(query: string) {
    this.setState({ query }, () => {
      this.searchData();
    });
  }

  searchData = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await searchPosts({ limit: 20, q: this.state.query });
      this.setState({ data: data.posts, isLoading: false });
    } catch {
      this.setState({ isLoading: false, isError: true });
    }
  };

  getData = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await getPosts({ limit: 20 });
      this.setState({ data: data.posts, isLoading: false });
    } catch {
      this.setState({ isLoading: false, isError: true });
    }
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') as string;
    this.setState({ query: savedQuery || '' }, () => {
      if (savedQuery) {
        this.searchData();
      } else {
        this.getData();
      }
    });
  }

  render() {
    const { isLoading, data, query, showError, isError } = this.state;

    if (showError) {
      throw new Error('Test error triggered by button');
    }

    if (isError) {
      throw new Error('Error when get data');
    }

    return (
      <div className="bg-indigo-50 h-screen flex justify-center items-center flex-col gap-2">
        <SearchBar
          value={query}
          onChange={this.handleInputChange}
          onSearch={(query: string) => this.handleSearch(query)}
        />

        <CardList posts={data} isLoading={isLoading} />

        {/* Test button to trigger ErrorBoundary */}
        <div className="w-full flex justify-end mb-10 px-10">
          <button
            className="border border-red-400 px-4 py-2 rounded hover:bg-red-50"
            onClick={() => this.setState({ showError: true })}
          >
            Test Error Boundary
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;
