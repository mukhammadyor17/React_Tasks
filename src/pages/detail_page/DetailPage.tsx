import { useState, useEffect, useCallback } from 'react';
import { NavLink, useParams } from 'react-router';
import type { Post } from '../../models/post.interface';
import { getPostById } from '../../queries/get_by_id';
import Loader from '../../components/loader/Loader';

const DetailPage = () => {
  const [data, setData] = useState<Post>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getPostById(id as string);
      setData(res);
    } catch (e) {
      console.error('Error when getting detail', e);
      setError('Failed to load post details.');
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div className="p-6">
      <div className="flex justify-end">
        <NavLink
          to={'/'}
          className="px-6 py-2 bg-indigo-500 text-white rounded active:bg-indigo-600 hover:bg-indigo-700 transition-colors ml-auto"
        >
          Close
        </NavLink>
      </div>
      {isLoading && <Loader className="m-auto" />}
      {error && !isLoading && (
        <div className="mt-5 p-5 border border-red-200 bg-red-50 text-red-700 rounded-sm">
          {error}
        </div>
      )}
      {data && !isLoading && !error && (
        <div className="mt-5 p-5 border border-indigo-100 rounded-sm">
          <div className="text-2xl font-semibold mb-6">
            {data.title ?? 'No Title'}
          </div>
          <div className="mb-5">{data.body ?? 'No Content'}</div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {data.tags?.map((tag: string) => (
                <div
                  className="rounded-sm px-2 py-1 bg-indigo-100 text-indigo-500"
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-5 font-semibold">
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
