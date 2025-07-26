import { getPosts } from '../../queries/get_posts';
import { searchPosts } from '../../queries/search_posts';
import { type Post } from '../../models/post.interface';

import CardList from '../../components/card_list/CardList';
import SearchBar from '../../components/search_bar/SearchBar';
import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await getPosts({ limit: 20 });
      setData(res.posts);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchSearch(searchQuery: string) {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await searchPosts({ limit: 20, q: searchQuery });
      setData(res.posts);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('searchQuery') ?? '';
    setQuery(saved);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      fetchPosts();
      return;
    }

    const timer = setTimeout(() => {
      localStorage.setItem('searchQuery', trimmed);
      fetchSearch(trimmed);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (showError) throw new Error('Test error triggered by button');
  if (isError) throw new Error('Error when get data');

  return (
    <div className="bg-indigo-50 h-screen flex justify-center items-center flex-col gap-2">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={(val) => setQuery(val)}
      />

      <CardList posts={data} isLoading={isLoading} />

      <div className="w-full flex justify-end mb-10 px-10">
        <button
          className="border border-red-400 px-4 py-2 rounded hover:bg-red-50"
          onClick={() => setShowError(true)}
        >
          Test Error Boundary
        </button>
      </div>
    </div>
  );
};

export default HomePage;
