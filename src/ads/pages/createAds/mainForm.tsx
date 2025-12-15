import styles from "./main.module.scss";
import { useLoaderData, useOutletContext } from "react-router-dom";
import {
  Controller,
  FieldErrors,
  useFormContext,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { PropsForm, ServiceItem } from "./CreateAds";
import FieldPhoto from "./fieldPhoto";
import ButtonForm from "../../../shared/button/button";
import Select from "react-select";
import { conditionOption, TypeOfAd } from "./helpers";
import { useEffect } from "react";

interface CategoriesAds {
  id: number;
  title: string;
  subcategories: Array<CategoriesAds> | null;
  img?: string;
}

export default function MainFormAds() {
  const { typeOfAd, selectedCategoryId } = useOutletContext<{
    typeOfAd: TypeOfAd;
    selectedCategoryId: number;
  }>();
  const { setValue, control, formState } = useFormContext();
  const CategoriesAds = useLoaderData() as CategoriesAds[];

  const {
    fields: priceListEntries,
    append,
    remove,
  } = useFieldArray({ control, name: "price_list_entris" });

  const addItemAds = () => {
    append({ title: "", price: 0 });
  };

  const removeItemAds = (index: number) => {
    remove(index);
  };

  const options = CategoriesAds.map((ad) => ({
    value: ad.id,
    label: ad.title,
  }));

  const errors = formState.errors as FieldErrors<PropsForm>;

  useEffect(() => {
    setValue("category_id", selectedCategoryId);
  }, [selectedCategoryId]);

  useEffect(() => {
    if (typeOfAd === "services") {
      setValue("price_list_entris", []);
      addItemAds();
    }
  }, []);

  return (
    <section >
      <div className={styles.content}>
        <div className={styles.field}>
          <div className={styles.label__field}>Категория</div>
          <Controller
            key={`category-${selectedCategoryId}`}
            control={control}
            name="category_id"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  classNamePrefix={styles.select}
                  ref={ref}
                  name="category_id"
                  onChange={(selectedOption) => onChange(selectedOption?.value)}
                  onBlur={onBlur}
                  value={options.find((item) => item.value == value)}
                  options={options}
                  getOptionLabel={(option) => option.label}
                />
              );
            }}
          />
          {errors.category_id && (
            <div className={styles.errorsWrapper}>
              <div>{errors.category_id.message}</div>
            </div>
          )}
        </div>

        <div className={styles.field}>
          <div className={styles.label__field}>
            Название {typeOfAd === "ads" ? "объявления" : "услуги"}
          </div>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <input
                className={styles.input}
                {...field}
                type="text"
                name="title"
                placeholder={`Название ${
                  typeOfAd === "ads" ? "объявления" : "услуги"
                }`}
              />
            )}
          />
          {errors.title && (
            <div className={styles.errorsWrapper}>
              <div>{errors.title.message}</div>
            </div>
          )}
        </div>

        {/*Поля: место встречи, опыт работы*/}
        {typeOfAd === "services" && (
          <>
            <div className={styles.field}>
              <div className={styles.label__field}>Место встречи</div>
              <Controller
                control={control}
                name="venue"
                render={({ field }) => (
                  <input
                    {...field}
                    value={field.value ?? ""}
                    className={styles.input}
                    type="text"
                    placeholder="Место встречи"
                  />
                )}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.label__field}>Опыт работы</div>
              <Controller
                control={control}
                name="experience"
                render={({ field }) => (
                  <input
                    {...field}
                    value={field.value ?? ""}
                    type="number"
                    className={styles.input}
                    placeholder="Опыт работы"
                  />
                )}
              />
            </div>
          </>
        )}

        <div className={styles.field}>
          <div className={styles.label__field}>Описание</div>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <textarea
                {...field}
                className={styles.textarea}
                value={field.value ?? ""}
                placeholder={"до тысячи символов"}
                maxLength={1000}
              />
            )}
          />
          {errors.description && (
            <div className={styles.errorsWrapper}>
              <div>{errors.description.message}</div>
            </div>
          )}
        </div>

        {/* Стоимость услуги */}
        {typeOfAd === "services" && (
          <div className={styles.field}>
            <div className={styles.label__field}>Стоимость услуги</div>
            {priceListEntries.map((field, index) => (
              <div key={field.id} className={styles.wrapper__fieldsPrice}>
                <Controller
                  control={control}
                  name={`price_list_entris.${index}.title`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={styles.input}
                      placeholder="Название услуги"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`price_list_entris.${index}.price`}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className={styles.input}
                      placeholder="Цена ₽"
                    />
                  )}
                />

                <button
                  type="button"
                  onClick={() => removeItemAds(index)}
                  className={styles.removeItemAdsButton}
                >
                  Убрать
                </button>
              </div>
            ))}

            <button
              type="button"
              className={styles.buttonAddedPrice}
              onClick={() => addItemAds()}
            >
              Добавить
            </button>
          </div>
        )}

        <div className={styles.field}>
          <div className={styles.label__field}>Адрес</div>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <input
                {...field}
                className={styles.input}
                type="text"
                value={field.value ?? ""}
                placeholder={"Укажите адрес"}
              />
            )}
          />
        </div>

        {typeOfAd === "ads" && (
          <>
            <div className={styles.field}>
              <div className={styles.label__field}>Состояние</div>
              <Controller
                control={control}
                name="condition"
                render={({ field }) => {
                  const selectedOption =
                    conditionOption.find(
                      (item) => item.value === field.value
                    ) ?? null;

                  return (
                    <Select
                      {...field}
                      ref={field.ref}
                      options={conditionOption}
                      value={selectedOption}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                      placeholder="Выберите состояние"
                    />
                  );
                }}
              />
              {"condition" in errors && errors.condition && (
                <div className={styles.errorsWrapper}>
                  <div>{errors.condition.message}</div>
                </div>
              )}
            </div>
            <div className={styles.field}>
              <div className={styles.label__field}>Цена</div>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <input
                    className={styles.input}
                    {...field}
                    value={field.value ?? 0}
                    type="number"
                    placeholder={"Укажите цену"}
                  />
                )}
              />
            </div>
          </>
        )}

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
