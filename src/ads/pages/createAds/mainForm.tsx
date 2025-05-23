import React from "react";
import styles from "./main.module.scss";
import arrowBack from "../../../assets/icon/arrowLeft.svg";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Controller,
  FieldErrors,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { itemAds, PropsForm } from "./CreateAds";
import FieldPhoto from "./fieldPhoto";
import ButtonForm from "../../../shared/button/button";
import Select from "react-select";
import { fetchAdsTypes } from "../../../shared/api/typeAdsApi";

interface CategoriesAds {
  id: number;
  title: string;
  subcategories: Array<CategoriesAds> | null;
  img?: string;
}

interface Options {
  value: number;
  label: string;
}

export default function MainFormAds() {
  const navigate = useNavigate();
  const { setValue, control, formState, watch } = useFormContext();
  const CategoriesAds = useLoaderData() as CategoriesAds[];
  const [selectTypes, setSelectTypes] = React.useState(false);
  const [typesAds, setTypesAds] = React.useState<Options[]>([]);

  const itemAds = useWatch({ control, name: "itemAds" });

  const addItemAds = () => {
    const newItemAds = [...itemAds, { nameAds: "", price: "" }];
    setValue("itemAds", newItemAds, { shouldValidate: true });
  };

  const typeId = watch("type_id");

  const options = CategoriesAds.map((ad) => ({
    value: ad.id,
    label: ad.title,
  }));

  const errors = formState.errors as FieldErrors<PropsForm>;

  const fetchTypesAds = async (type_id: string) => {
    try {
      const response = await fetchAdsTypes(type_id);
      const data = response as CategoriesAds;

      if (data.subcategories) {
        const optionsTypes = data.subcategories.map((ad) => ({
          value: ad.id,
          label: ad.title,
        }));

        setTypesAds(optionsTypes);
      }

    } catch (e) {
      console.log("error", e);
    }
  };

  React.useEffect(() => {
    if (typeId !== "") {
      fetchTypesAds(typeId);
      setSelectTypes(true);
    } else {
      setSelectTypes(false);
    }
  }, [typeId]);

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
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  ref={ref}
                  name="type_id"
                  onChange={(selectedOption) => onChange(selectedOption?.value)}
                  onBlur={onBlur}
                  value={options.find((item) => item.value == value)}
                  options={options}
                  placeholder="вид услуги"
                />
              );
            }}
          />
          {errors.type_id && (
            <div className={styles.errorsWrapper}>
              <div>{errors.type_id.message}</div>
            </div>
          )}
        </div>

        <div className={styles.field}>
          <div className={styles.label__field}>Тип услуги</div>
          <Controller
            control={control}
            name="typeAds"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                noOptionsMessage={() => {
                  return "У этой услуги нету типов";
                }}
                ref={ref}
                name="typeAds"
                onChange={(selectedOption) => onChange(selectedOption?.value)}
                onBlur={onBlur}
                value={typesAds.find((item) => item.value == value)}
                options={typesAds}
                placeholder="Тип услуги"
                isDisabled={!selectTypes}
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
          {errors.title && (
            <div className={styles.errorsWrapper}>
              <div>{errors.title.message}</div>
            </div>
          )}
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
          {errors.description && (
            <div className={styles.errorsWrapper}>
              <div>{errors.description.message}</div>
            </div>
          )}
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
          disabled={!formState.isValid}
        />
      </div>
    </section>
  );
}
