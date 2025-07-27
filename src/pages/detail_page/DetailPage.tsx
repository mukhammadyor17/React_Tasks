import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router';
import type { Post } from '../../models/post.interface';
import { getPostById } from '../../queries/get_by_id';
import Loader from '../../components/loader/Loader';

const DetailPage = () => {
  const [data, setData] = useState<Post>();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  async function fetchPost() {
    try {
      setIsLoading(true);
      const res = await getPostById(id as string);
      setData(res);
    } catch {
      console.error('error when get detail');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

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
      {data && !isLoading && (
        <div className="mt-5 p-5 border border-indigo-100 rounded-sm">
          <div className="text-2xl font-semibold mb-6">{data?.title}</div>
          <div className="flex justify-end gap-5 font-semibold mb-5">
            <div>👍🏻 {data?.reactions?.likes}</div>
            <div>👎🏻 {data?.reactions?.dislikes}</div>
          </div>
          <div className="mb-5">{data?.body}</div>
          <div className="flex gap-2">
            {data?.tags?.map((tag: string) => (
              <div
                className="rounded-sm px-2 py-1 bg-indigo-100 text-indigo-500"
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
