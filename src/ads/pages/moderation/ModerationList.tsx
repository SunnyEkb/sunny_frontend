import React from 'react';
import './ModerationList.scss';

const ModerationList = ({ type, onItemSelect }) => {
  // Placeholder data
  const items = [
    { id: 1, title: `${type} Title 1`, description: `${type} Description 1` },
    { id: 2, title: `${type} Title 2`, description: `${type} Description 2` },
    { id: 3, title: `${type} Title 3`, description: `${type} Description 3` },
  ];

  return (
    <div className="moderation-list">
      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item" onClick={() => onItemSelect(item)}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModerationList;
