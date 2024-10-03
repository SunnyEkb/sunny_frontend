import React from "react";
import styles from "./style.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import arrowBack from "../../../assets/icon/arrowLeft.svg";
import { defaultTypeAds } from "./helpers";

export default function ChooseTypeAds() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setValue } = useFormContext();

  const handleAds = (item: { id: number; title: string }) => {
    setValue("typeAds", item.title);
    navigate("ads", { replace: false, state: { back: location } });
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
        <div className={styles.header__title}></div>
      </div>

      <div className={styles.header__subtitle}>Выберите тип услуги</div>

      <div className={styles.listItems}>
        {defaultTypeAds.map((item) => {
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
