import React from 'react';
import Loader from '../loader/Loader';
import CardItem from '../card_item/CardItem';
import ErrorCard from '../error_card/ErrorCard';

interface CardListProps {
  isLoading: boolean;
  isError: boolean;
}

class CardList extends React.Component<CardListProps> {
  render() {
    return (
      <div className="flex-grow flex flex-col gap-4 overflow-y-auto px-10 py-5">
        {this.props.isLoading && <Loader />}
        {this.props.isError && <ErrorCard />}

        {!this.props.isError && !this.props.isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <CardItem />
            <CardItem />
            <CardItem />
          </div>
        )}
      </div>
    );
  }
}

export default CardList;
