import { Component } from 'react';
import { getPosts } from './queries/get_posts';
import CardList from './components/card_list/CardList';
import SearchBar from './components/search_bar/SearchBar';

interface Post {
  id: number;
  name: string;
}

interface AppState {
  data: Post[];
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
}

class App extends Component<unknown, AppState> {
  state: AppState = {
    data: [],
    error: null,
    isLoading: false,
    isError: false,
  };

  constructor(props: unknown) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query: string) {
    console.log('Search query:', query);
  }

  getData = async () => {
    try {
      this.setState({ isLoading: true, isError: false });
      const { data } = await getPosts({ limit: 20 });
      this.setState({ data, isLoading: false });
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
        <SearchBar onSearch={this.handleSearch} />
        <CardList isLoading={isLoading} isError={isError} />
      </div>
    );
  }
}

export default App;
