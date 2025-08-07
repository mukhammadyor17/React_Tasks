import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  useGetPostsQuery,
  useSearchPostsQuery,
} from '../../store/query/post_api';
import { type Post } from '../../models/post.interface';
import type { RootState } from '../../store';

import CardList from '../../components/card_list/CardList';
import SearchBar from '../../components/search_bar/SearchBar';
import SelectedCard from '../../components/selected_card/SelectedCard';

const pages = [1, 2, 3, 4, 5, 6, 7];
const limit = 5;

const HomePage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const trimmedQuery = query.trim();
  const skip = (page - 1) * limit;

  const {
    data: postsResponse,
    isLoading: postsLoading,
    isError: postsError,
  } = useGetPostsQuery({ limit, skip }, { skip: !!trimmedQuery });

  const {
    data: searchResponse,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchPostsQuery({ limit, q: trimmedQuery }, { skip: !trimmedQuery });

  useEffect(() => {
    const saved = localStorage.getItem('searchQuery') ?? '';
    setQuery(saved);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    const timer = setTimeout(() => {
      localStorage.setItem('searchQuery', trimmed);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (trimmedQuery) {
      setData(searchResponse?.posts ?? []);
      setIsLoading(searchLoading);
      setIsError(Boolean(searchError));
    } else {
      setData(postsResponse?.posts ?? []);
      setIsLoading(postsLoading);
      setIsError(Boolean(postsError));
    }
  }, [
    trimmedQuery,
    searchResponse,
    postsResponse,
    searchLoading,
    postsLoading,
    searchError,
    postsError,
  ]);

  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;
    if (urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams]);

  const changePageHandler = (index: number) => {
    setSearchParams({ page: index.toString() });
    setPage(index);
  };

  if (showError) throw new Error('Test error triggered by button');
  if (isError) throw new Error('Error when get data');

  return (
    <div className="bg-indigo-50 dark:bg-gray-900 min-h-screen flex justify-center items-center flex-col gap-2 p-4">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={(val) => setQuery(val)}
      />

      <CardList posts={data} isLoading={isLoading} />

      <div className="flex gap-4 my-3">
        {pages.map((i: number) => (
          <button
            className={`w-10 h-10 flex justify-center items-center cursor-pointer border border-indigo-400 dark:border-indigo-500 rounded-md transition-colors ${
              page === i
                ? 'bg-indigo-400 dark:bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
            }`}
            key={i}
            onClick={() => changePageHandler(i)}
          >
            {i}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-end mb-10 px-10">
        <button
          className="border border-red-400 dark:border-red-500 px-4 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
          onClick={() => setShowError(true)}
        >
          Test Error Boundary
        </button>
      </div>

      {favorites.length > 0 && <SelectedCard />}
    </div>
  );
};

export default HomePage;
