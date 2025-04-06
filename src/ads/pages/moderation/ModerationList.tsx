import React, { useEffect, useState } from 'react';
import MiniAdCard from './MiniAdCard';
import './ModerationList.scss';

const BASE_URL = 'https://sunnyekb.ru/api/v1/';

const ModerationList = ({ type, onItemSelect }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        let response;
        if (type === 'ads') {
          response = await fetch(`${BASE_URL}moderator/ads/`, requestOptions);
        } else if (type === 'services') {
          response = await fetch(`${BASE_URL}moderator/services/`, requestOptions);
        } else if (type === 'comments') {
          response = await fetch(`${BASE_URL}moderator/comments/`, requestOptions);
        }
        if (response.status === 401) {
          throw new Error('Пользователь не авторизован');
        }
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="moderation-list">
      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item" onClick={() => onItemSelect(item)}>
            <MiniAdCard ad={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModerationList;
