'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { clear } from '../../store/features/favorites/favorites_slice';

const SelectedCard = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();

  const handleDownload = () => {
    const encoded = encodeURIComponent(JSON.stringify(favorites));
    window.open(`/api/download-csv?data=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xs dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
      <div className="dark:text-white">
        Selected items count: <b>{favorites.length}</b>
      </div>
      <div className="flex gap-5">
        <button
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded active:bg-indigo-700 dark:active:bg-indigo-800 transition-colors"
          onClick={() => dispatch(clear())}
        >
          Unselect all
        </button>
        <button
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded active:bg-indigo-700 dark:active:bg-indigo-800 transition-colors"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default SelectedCard;
