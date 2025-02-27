import React from "react";
import styles from "./style.module.scss";
import arrowBack from "../../../assets/icon/arrowLeft.svg";
import { useNavigate } from "react-router-dom";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { itemAds } from "./CreateAds";
import FieldPhoto from "./fieldPhoto";
import ButtonForm from "../../../shared/button/button";

export default function MainFormAds() {
  const navigate = useNavigate();
  const { setValue, control } = useFormContext();

  const itemAds = useWatch({ control, name: "itemAds" });

  const addItemAds = () => {
    const newItemAds = [...itemAds, { nameAds: "", price: "" }];
    setValue("itemAds", newItemAds, { shouldValidate: true });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <img
          src={arrowBack}
          alt={"back"}
          className={styles.arrow}
          onClick={() => navigate(-1)}
        />
        <div className={styles.header__title}></div>
      </div>

      <div className={styles.content}>

        <div className={styles.field}>
          <div className={styles.label__field}>Вид услуги</div>
          <Controller
            control={control}
            name="type_id"
            render={({ field }) => (
              <input
                className={styles.input}
                {...field}
                type="text"
                name="type_id"
                placeholder={"вид услуги"}
              />
            )}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label__field}>Тип услуги</div>
          <Controller
            control={control}
            name="typeAds"
            render={({ field }) => (
              <input
                className={styles.input}
                {...field}
                type="text"
                placeholder={"тип услуги"}
              />
            )}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label__field}>Название услуги</div>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <input
                className={styles.input}
                {...field}
                type="text"
                name="title"
                placeholder={"название услуги"}
              />
            )}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label__field}>Место встречи</div>
          <Controller
            control={control}
            name="venue"
            render={({ field }) => {
              return (
                <input
                  onChange={(e) => field.onChange(e)}
                  className={styles.input}
                  type="text"
                  placeholder={"Место встречи"}
                />
              );
            }}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label__field}>Опыт работы</div>
          <Controller
            control={control}
            name="experience"
            render={({ field }) => (
              <input
                className={styles.input}
                {...field}
                type="text"
                placeholder={"Опты работы"}
              />
            )}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label__field}>Описание</div>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <input
                className={styles.input}
                {...field}
                type="textarea"
                placeholder={"до тысячи символов"}
              />
            )}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label__field}>Стоимость услуги</div>
          {itemAds.map((item: itemAds, index: number) => {
            return (
              <div className={styles.wrapper__fieldsPrice} key={index}>
                <Controller
                  control={control}
                  name={`itemAds[${index}].nameAds`}
                  render={({ field }) => (
                    <input
                      className={styles.input}
                      {...field}
                      type="textarea"
                      placeholder={"Название услуги"}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`itemAds[${index}].price`}
                  render={({ field }) => (
                    <input
                      className={styles.input}
                      {...field}
                      type="number"
                      placeholder={"Цена ₽"}
                    />
                  )}
                />
              </div>
            );
          })}

          <button
            type="button"
            className={styles.buttonAddedPrice}
            onClick={() => addItemAds()}
          >
            Добавить
          </button>
        </div>
        <FieldPhoto />

        <ButtonForm
          title="Опубликовать"
          type="submit"
          extraClass={styles.submitButtonWrapper}
        />
      </div>
    </section>
  );
}
