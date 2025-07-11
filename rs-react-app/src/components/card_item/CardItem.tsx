import React from 'react';
import { type Post } from '../../models/post.interface';

interface CardItemProps {
  post: Post;
}

class CardItem extends React.Component<CardItemProps> {
  render() {
    const { title, body } = this.props.post;

    return (
      <div className="bg-white p-4 rounded-lg shadow-xs hover:shadow transition-shadow cursor-pointer">
        <div className=" font-bold mb-2">{title}</div>
        <div className="text-sm text-gray-600">{body.slice(0, 30)}...</div>
      </div>
    );
  }
}

export default CardItem;
