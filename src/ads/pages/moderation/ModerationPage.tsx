import { useState, useEffect } from "react";
import ModerationList from "./ModerationList";
import ModerationDetail from "./ModerationDetail";
import "./ModerationPage.scss";
import {
  fetchAds,
  fetchComments,
  fetchServices,
} from "../../../shared/api/moderationApi";

const ModerationPage = () => {
  
  const [visibleComponent, setVisibleComponent] = useState("menu");
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState("");
  const [history, setHistory] = useState([]);
  const [counts, setCounts] = useState({ ads: 0, services: 0, comments: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const adsData = await fetchAds();
        const servicesData = await fetchServices();
        const commentsData = await fetchComments();

        setCounts({
          ads: adsData?.count,
          services: servicesData?.count,
          comments: commentsData?.count,
        });
      } catch (error) {
        console.error("Ошибка при получении количества:", error);
        setError(error?.message);
      }
    };

    fetchCounts();
  }, []);

  const handleComponentSwitch = (component: string) => {
    setHistory([...history, visibleComponent]);
    setVisibleComponent(component);
    setItemType(component);
  };

  const handleItemSelect = (item: any) => {
    setHistory([...history, visibleComponent]);
    setSelectedItem(item);
    setVisibleComponent("detail");
  };

  const handleBack = () => {
    const previousComponent = history.pop();
    setHistory(history);
    setVisibleComponent(previousComponent);
    if (previousComponent !== "detail") {
      setSelectedItem(null);
    }
  };

  const getHeaderTitle = () => {
    if (visibleComponent === "menu") return "Модерация";
    if (visibleComponent === "moderation") return "На модерацию";
    if (visibleComponent === "ads") return "Объявления";
    if (visibleComponent === "services") return "Услуги";
    if (visibleComponent === "comments") return "Комментарии";
    if (visibleComponent === "detail")
      return selectedItem ? selectedItem?.title : "";
    return "Модерация";
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
        {error && <div className="error-message">{error}</div>}
        {visibleComponent === "menu" && !error && (
          <div className="menu">
            <div
              className="menu-item"
              onClick={() => handleComponentSwitch("moderation")}
            >
              <span>На модерацию</span>
              <span>{counts.ads + counts.services + counts.comments}</span>
            </div>
          </div>
        )}
        {visibleComponent === "moderation" && !error && (
          <div className="menu">
            <div
              className="menu-item"
              onClick={() => handleComponentSwitch("ads")}
            >
              <span>Объявления</span>
              <span>{counts.ads}</span>
            </div>
            <div
              className="menu-item"
              onClick={() => handleComponentSwitch("services")}
            >
              <span>Услуги</span>
              <span>{counts.services}</span>
            </div>
            <div
              className="menu-item"
              onClick={() => handleComponentSwitch("comments")}
            >
              <span>Комментарии</span>
              <span>{counts.comments}</span>
            </div>
          </div>
        )}
        {visibleComponent === "ads" && !error && (
          <ModerationList type="ads" onItemSelect={handleItemSelect} />
        )}
        {visibleComponent === "services" && !error && (
          <ModerationList type="services" onItemSelect={handleItemSelect} />
        )}
        {visibleComponent === "comments" && !error && (
          <ModerationList type="comments" onItemSelect={handleItemSelect} />
        )}
        {visibleComponent === "detail" && selectedItem && !error && (
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
