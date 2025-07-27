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
      className="bg-white p-4 rounded-lg shadow-xs hover:shadow transition-shadow cursor-pointer"
    >
      <div className=" font-bold mb-2">{title}</div>
      <div className="text-sm text-gray-600">{body}</div>
    </NavLink>
  );
};

export default CardItem;
