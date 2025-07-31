import React from 'react';
import { NavLink } from 'react-router-dom';
import { type Post } from '../../models/post.interface';

interface CardItemProps {
  post: Post;
}

const CardItem: React.FC<CardItemProps> = ({ post }) => {
  const { title, body, id } = post;

  return (
    <NavLink
      to={`post/${id}`}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xs hover:shadow-md dark:shadow-gray-900/50 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
    >
      <div className="font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{body}</div>
    </NavLink>
  );
};

export default CardItem;
