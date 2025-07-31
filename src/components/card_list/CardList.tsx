import React from 'react';
import Loader from '../loader/Loader';
import CardItem from '../card_item/CardItem';
import { type Post } from '../../models/post.interface';

interface CardListProps {
  isLoading: boolean;
  posts: Post[];
}

const CardList: React.FC<CardListProps> = ({ isLoading, posts }) => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-y-auto px-10 py-5">
      {isLoading && <Loader />}

      {!posts.length && !isLoading && (
        <div className="text-center text-gray-600 dark:text-gray-400 text-lg">
          Not Found!
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {posts.map((post: Post) => (
            <CardItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
