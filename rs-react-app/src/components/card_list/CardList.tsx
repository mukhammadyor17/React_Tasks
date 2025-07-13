import React from 'react';
import Loader from '../loader/Loader';
import CardItem from '../card_item/CardItem';
import { type Post } from '../../models/post.interface';

interface CardListProps {
  isLoading: boolean;
  posts: Post[];
}

class CardList extends React.Component<CardListProps> {
  render() {
    return (
      <div className="flex-grow flex flex-col gap-4 overflow-y-auto px-10 py-5">
        {this.props.isLoading && <Loader />}

        {!this.props.posts.length && !this.props.isLoading && (
          <div>Not Found!</div>
        )}

        {!this.props.isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {this.props.posts.map((post: Post) => (
              <CardItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CardList;
