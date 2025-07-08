import React from 'react';

class CardItem extends React.Component {
  render() {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs hover:shadow transition-shadow cursor-pointer">
        <div>Lorem ipsum</div>
        <div>Lorem ipsum dolor sit amet consectetur.</div>
      </div>
    );
  }
}

export default CardItem;
