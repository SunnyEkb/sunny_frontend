import React, { useEffect, useMemo, useState } from "react";
import styles from "./main.module.scss";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  useAddPhotoToServiceMutation,
  useCreateServiceMutation,
  usePublishServiceMutation,
} from "../../../store/entities/services/services";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CategoriesAd,
  defaultTypeAd,
  TypeOfAd,
  validationSchemas,
} from "./helpers";
import ArrowBack from "../../../assets/icon/arrow-left.svg?react";
import { RootModal } from "../../../app/layouts/RootModal/RootModal";

export interface ServiceItem {
  title: string;
  price: number;
}

export interface IPhoto {
  url: string;
  file: File;
}

export interface BaseForm {
  title: string;
  description: string;
  category_id: number | null;
  photo?: IPhoto[] | null;
  address?: string;
}

export interface AdsForm extends BaseForm {
  price: number;
  condition: string;
}

export interface ServicesForm extends BaseForm {
  venue: string;
  experience?: number;
  price_list_entris: {
    title: string;
    price: number;
  }[];
}
export type PropsForm = AdsForm | ServicesForm;

export default function CreateAds() {
  const navigate = useNavigate();
  const [typeOfAd, setTypesAd] = useState<TypeOfAd | null>(null);
  const [isAdCreated, setIsAdCreated] = useState(false);
  const resolver = useMemo(() => {
    if (!typeOfAd) return;

    return yupResolver(validationSchemas[typeOfAd]);
  }, [typeOfAd]);

  const methods = useForm<PropsForm>({
    defaultValues: {
      title: "",
      description: "",
      category_id: null,
      address: "",
    },
    resolver,
    shouldUnregister: true,
    mode: "all",
  });

  const [createAds] = useCreateServiceMutation();
  const [publishAds] = usePublishServiceMutation();
  const [addPhoto] = useAddPhotoToServiceMutation();

  const categoriesData = useLoaderData<CategoriesAd[]>();

  const onSubmit = async (data: PropsForm) => {
    try {
      const response = await createAds({
        endPoint: typeOfAd,
        data: { ...data },
      });
      const id = response.data?.id;
      if (!id) throw new Error("No ID returned from createAds");
      if (data.photo && data.photo.length > 0 && data.photo[0].file) {
        const toBase64 = (file: File): Promise<string> =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
          });

        let images: { image: string }[] = [];
        for (const photo of data.photo) {
          if (photo.file) {
            const base64Image = await toBase64(photo.file);
            const mimeType = photo.file.type;
            const base64Data = base64Image.split(",")[1];
            const finalBase64 = `data:${mimeType};base64,${base64Data}`;

            images.push({ image: finalBase64 });
          }
        }

        await addPhoto({ id, images });
      }
      await publishAds(response.data?.id);

      setIsAdCreated(true);
      setTimeout(() => {
        navigate(`/catalogs/${id}/${typeOfAd}/${response.data.id}`);
      }, 3000)
    } catch (err) {
      console.log("Произошла какая-то ошибка");
    }
  };
  const formRef = React.useRef<HTMLFormElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );




  return (
    <>
      {isAdCreated && (
        <RootModal>
          <div className={styles.adCreatedModal}>
            <h2>
              {typeOfAd == "ads"
                ? "Ваше объявление создано и отправлено на модерацию!"
                : "Ваша услуга создана и отправлена на модерацию!"}
            </h2>
            <p>
              Сейчас произойдёт перенаправление на страницу{" "}
              {typeOfAd === "ads" ? "объявления" : "услуги"}
            </p>
            <div className={styles.dotContainer}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
        </RootModal>
      )}
      <section className={styles.section}>
        <h1>
          <button
            type="button"
            aria-label="Назад"
            onClick={() => {
              if (typeOfAd) {
                setTypesAd(null);
                setSelectedCategoryId(null);
                return;
              }

              navigate(-1);
            }}
            className={styles.headerButton}
          >
            <ArrowBack />{" "}
            {!selectedCategoryId && (
              <span className={styles.header__title}>
                {typeOfAd ? defaultTypeAd[typeOfAd] : "Новое объявление"}
              </span>
            )}
          </button>
        </h1>

        {typeOfAd && !selectedCategoryId && (
          <h2 className={styles.header__subtitle}>Выберите категорию</h2>
        )}

        {!typeOfAd && (
          <ul
            role="list"
            aria-label="Выбор типа объявления"
            className={styles.listItems}
          >
            {Object.keys(defaultTypeAd).map((key) => {
              const typedKey = key as TypeOfAd;

              return (
                <li key={typedKey}>
                  <button
                    onClick={() => setTypesAd(typedKey)}
                    className={styles.itemButton}
                  >
                    {defaultTypeAd[typedKey]}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {!selectedCategoryId && typeOfAd && (
          <ul
            role="list"
            aria-label="Выбор категории"
            className={styles.listItems}
          >
            {categoriesData.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={styles.itemButton}
                >
                  {category.title}
                </button>
              </li>
            ))}
          </ul>
        )}

        {typeOfAd && selectedCategoryId && (
          <FormProvider {...methods}>
            <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
              <Outlet
                context={{
                  typeOfAd,
                  selectedCategoryId,
                  submitForm: () => {
                    formRef.current?.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true }),
                    );
                  },
                }}
              />
            </form>
          </FormProvider>
        )}
      </section>
    </>
  );
}
