import React from "react";
import styles from "./style.module.scss";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { defaultAds } from "./helpers";
import arrowBack from "../../../assets/icon/arrowLeft.svg";
import { useFormContext } from "react-hook-form";

interface DataProps {
  id: number;
  title: string;
  subcategories: Array<unknown> | null;
  img?: string;
}

export default function ChooseAds() {
  const categoriesAds = useLoaderData() as DataProps[] | null;

  const navigate = useNavigate();
  const location = useLocation();

  const { setValue } = useFormContext();

  const handleAds = (item: { id: number; title: string }) => {
    setValue("type_id", item.id);
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
        {categoriesAds?.map((item) => {
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
