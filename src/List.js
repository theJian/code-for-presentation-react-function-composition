import React from 'react';

const List = ({ items, onClickItem, renderItem, ...props }) => (
  <div {...props}>
    <ul>
      {items.map((key, idx) => (
        <li onClick={onClickItem && onClickItem.bind(null, key)} key={key.id || idx}>
          {renderItem(key)}
        </li>
      ))}
    </ul>
  </div>
)

export default List;
