import CardList from './components/card_list/CardList';
import SearchBar from './components/search_bar/SearchBar';

const App = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="bg-indigo-50 h-screen flex justify-center items-center flex-col gap-2">
      <SearchBar onSearch={handleSearch} />
      <CardList isLoading={false} isError={false} />
    </div>
  );
};

export default App;
