import React, { useEffect, useState } from 'react';
import MiniAdCard from './MiniAdCard';
import './ModerationList.scss';
import { fetchAds, fetchComments, fetchServices } from '../../../shared/api/moderationApi';

interface Props {
  type: string;
  onItemSelect: (item: []) => void;
}


const ModerationList = ({ type, onItemSelect }: Props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {


        let response;
        if (type === 'ads') {
          response = await fetchAds();
        } else if (type === 'services') {
          response = await fetchServices();
        } else if (type === 'comments') {
          response = await fetchComments()
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
