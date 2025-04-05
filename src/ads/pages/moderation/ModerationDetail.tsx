import React from 'react';
import './ModerationDetail.scss';

const ModerationDetail = ({ item, type }) => {
  const approveItem = () => {
    alert(`${type === 'ads' ? 'Объявление' : type === 'services' ? 'Услуга' : 'Комментарий'} успешно одобрено`);
  };

  const rejectItem = () => {
    alert(`${type === 'ads' ? 'Объявление' : type === 'services' ? 'Услуга' : 'Комментарий'} успешно отклонено`);
  };

  return (
    <div className="moderation-detail-page">
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      {/* Display additional item details here */}
      <button className="approve-button" onClick={approveItem}>
        Одобрить
      </button>
      <button className="reject-button" onClick={rejectItem}>
        Отклонить
      </button>
    </div>
  );
};

export default ModerationDetail;
