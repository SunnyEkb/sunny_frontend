import React from "react";
import styles from "./main.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultAds } from "./helpers";
import arrowBack from "../../../assets/icon/arrowLeft.svg";
import { useFormContext } from "react-hook-form";

export default function ChooseAds() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setValue } = useFormContext();

  const handleAds = (item: { id: number; title: string }) => {
    setValue("viewAds", item.title);
    navigate("type", { replace: false, state: { back: location } });
  };

  return (
    <>
      <div className={styles.header}>
        <img
          src={arrowBack}
          alt={"back"}
          className={styles.arrow}
          onClick={() => navigate(-1)}
        />
        <div className={styles.header__title}>Услуги</div>
      </div>

      <div className={styles.header__subtitle}>Выберите вид услуги</div>

      <div className={styles.listItems}>
        {defaultAds.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.item}
              onClick={() => handleAds(item)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </>
  );
}
