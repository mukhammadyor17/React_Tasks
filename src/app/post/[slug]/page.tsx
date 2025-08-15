'use client';

import { useParams } from 'next/navigation';
import { useGetByIdQuery } from '../../../store/query/post_api';
import Link from 'next/link';
import Loader from '../../../components/loader/Loader';

export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>() ?? {};
  const { data, isLoading, isError } = useGetByIdQuery(slug ?? '');

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
        <Header />
        <div className="mt-5 p-5 border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-sm">
          Failed to load post details.
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
        <Header />
        <div className="mt-5 text-gray-700 dark:text-gray-300">
          No data found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <Header />
      <div className="mt-5 p-5 border border-indigo-100 dark:border-indigo-800 bg-white dark:bg-gray-800 rounded-sm shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          {data.title ?? 'No Title'}
        </h1>
        <p className="mb-5 text-gray-700 dark:text-gray-300">
          {data.body ?? 'No Content'}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {data.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-sm px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-5 font-semibold text-gray-700 dark:text-gray-300">
            <div>👍🏻 {data.reactions?.likes ?? 0}</div>
            <div>👎🏻 {data.reactions?.dislikes ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-start">
      <Link
        href="/"
        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 !text-white rounded active:bg-indigo-700 dark:active:bg-indigo-800 transition-colors"
      >
        Close
      </Link>
    </div>
  );
}
