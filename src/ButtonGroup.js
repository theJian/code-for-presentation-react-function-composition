import React from 'react';

const ButtonGroup = ({ items, onClickItem, renderItem, ...props }) => (
  <div {...props}>
    {items.map((key, idx) => (
      <button onClick={onClickItem.bind(null, key)} key={key.id || idx}>
        {renderItem(key)}
      </button>
    ))}
  </div>
)

export default ButtonGroup;
