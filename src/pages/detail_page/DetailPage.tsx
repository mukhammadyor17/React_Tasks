import { NavLink, useParams } from 'react-router-dom';
import { useGetByIdQuery } from '../../store/query/post_api';
import Loader from '../../components/loader/Loader';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetByIdQuery(id ?? '');

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen h-full">
      <div className="flex justify-end">
        <NavLink
          to="/React_Tasks"
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 !text-white rounded active:bg-indigo-700 dark:active:bg-indigo-800 transition-colors ml-auto"
        >
          Close
        </NavLink>
      </div>

      {isLoading && <Loader className="m-auto" />}

      {isError && !isLoading && (
        <div className="mt-5 p-5 border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-sm">
          Failed to load post details.
        </div>
      )}

      {data && !isLoading && !isError && (
        <div className="mt-5 p-5 border border-indigo-100 dark:border-indigo-800 bg-white dark:bg-gray-800 rounded-sm shadow-sm">
          <div className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            {data.title ?? 'No Title'}
          </div>
          <div className="mb-5 text-gray-700 dark:text-gray-300">
            {data.body ?? 'No Content'}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {data.tags?.map((tag: string) => (
                <div
                  key={tag}
                  className="rounded-sm px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-5 font-semibold text-gray-700 dark:text-gray-300">
              <div>👍🏻 {data.reactions?.likes ?? 0}</div>
              <div>👎🏻 {data.reactions?.dislikes ?? 0}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
