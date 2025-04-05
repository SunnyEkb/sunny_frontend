import React, { useState } from 'react';
import ModerationList from './ModerationList';
import ModerationDetail from './ModerationDetail';
import './ModerationPage.scss';

const ModerationPage = () => {
  const [visibleComponent, setVisibleComponent] = useState('menu');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState('');
  const [history, setHistory] = useState([]);

  const adsCount = 123;
  const servicesCount = 456;
  const commentsCount = 789;
  const totalCount = adsCount + servicesCount + commentsCount;

  const handleComponentSwitch = (component) => {
    setHistory([...history, visibleComponent]);
    setVisibleComponent(component);
    setItemType(component);
  };

  const handleItemSelect = (item) => {
    setHistory([...history, visibleComponent]);
    setSelectedItem(item);
    setVisibleComponent('detail');
  };

  const handleBack = () => {
    const previousComponent = history.pop();
    setHistory(history);
    setVisibleComponent(previousComponent);
    if (previousComponent !== 'detail') {
      setSelectedItem(null);
    }
  };

  const getHeaderTitle = () => {
    if (visibleComponent === 'menu') return 'Модерация';
    if (visibleComponent === 'moderation') return 'На модерацию';
    if (visibleComponent === 'ads') return 'Объявления';
    if (visibleComponent === 'services') return 'Услуги';
    if (visibleComponent === 'comments') return 'Комментарии';
    if (visibleComponent === 'detail') return selectedItem ? selectedItem.title : '';
    return 'Модерация';
  };

  return (
    <div className="moderation-page">
      <div className="header">
        {(history.length > 0 || selectedItem) && (
          <div className="back-button" onClick={handleBack}>
            ←
          </div>
        )}
        <div className="header-title">{getHeaderTitle()}</div>
      </div>
      <div className="divider"></div>
      <div className="content">
        {visibleComponent === 'menu' && (
          <div className="menu">
            <div className="menu-item" onClick={() => handleComponentSwitch('moderation')}>
              <span>На модерацию</span>
              <span>{totalCount}</span>
            </div>
          </div>
        )}
        {visibleComponent === 'moderation' && (
          <div className="menu">
            <div className="menu-item" onClick={() => handleComponentSwitch('ads')}>
              <span>Объявления</span>
              <span>{adsCount}</span>
            </div>
            <div className="menu-item" onClick={() => handleComponentSwitch('services')}>
              <span>Услуги</span>
              <span>{servicesCount}</span>
            </div>
            <div className="menu-item" onClick={() => handleComponentSwitch('comments')}>
              <span>Комментарии</span>
              <span>{commentsCount}</span>
            </div>
          </div>
        )}
        {visibleComponent === 'ads' && (
          <ModerationList type="ads" onItemSelect={handleItemSelect} />
        )}
        {visibleComponent === 'services' && (
          <ModerationList type="services" onItemSelect={handleItemSelect} />
        )}
        {visibleComponent === 'comments' && (
          <ModerationList type="comments" onItemSelect={handleItemSelect} />
        )}
        {visibleComponent === 'detail' && selectedItem && (
          <ModerationDetail item={selectedItem} type={itemType} />
        )}
      </div>
      <div className="footer">
        <button className="logout-button">Выйти</button>
      </div>
    </div>
  );
};

export default ModerationPage;
