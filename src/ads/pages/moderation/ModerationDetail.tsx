import React from "react";
import "./ModerationDetail.scss";
import { AdsInfo } from "../../../common/model/ads";
import { permissionModeration } from "../../../shared/api/moderationApi";
import { useNavigate } from "react-router-dom";

interface Props {
  item: AdsInfo;
  type: "services" | "ads" | "comments";
  setVisibleComponent: React.Dispatch<React.SetStateAction<string>>;
}

const ModerationDetail = ({ item, type, setVisibleComponent }: Props) => {
  const navigate = useNavigate();
  console.log("item", item);
  const approveItem = async () => {
    try {
      const data = await permissionModeration(item.id, type, "approve");

      if (data == "Объект одобрен.") {
        alert(
          `${
            type === "ads"
              ? "Объявление"
              : type === "services"
              ? "Услуга"
              : "Комментарий"
          } успешно одобрено`
        );
      }
      setVisibleComponent("menu");
      // navigate("/moderation");
      return data;
    } catch (e) {
      console.error("error", e);
    }
  };

  const rejectItem = async () => {
    try {
      const data = await permissionModeration(item.id, type, "reject");

      if (data == "Объект отклонен.") {
        alert(
          `${
            type === "ads"
              ? "Объявление"
              : type === "services"
              ? "Услуга"
              : "Комментарий"
          } успешно отклонено`
        );
      }
      setVisibleComponent("menu");
      // navigate("/moderation");

      return data;
    } catch (e) {
      console.error("error", e);
    }
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
