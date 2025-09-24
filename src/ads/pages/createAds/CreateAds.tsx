import React from "react";
import styles from "./main.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  useAddPhotoToServiceMutation,
  useCreateServiceMutation,
  usePublishServiceMutation,
} from "../../../store/entities/services/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdsValidSchema } from "./helpers";

export interface itemAds {
  nameAds: string;
  price: number;
}

export interface IPhoto {
  url?: string;
  file?: File;
}

export interface PropsForm {
  viewAds?: string;
  photo?: IPhoto[] | null;
  experience: number;
  type_id: string;
  title: string;
  description: string;
  itemAds?: itemAds[] | null;
  venue?: string; //место встречи
  typeAds?: string;
}

export default function CreateAds() {
  const navigate = useNavigate();
  const methods = useForm<PropsForm>({
    defaultValues: {
      itemAds: [],
      photo: [],
      viewAds: "",
      type_id: "",
      venue: "",
      experience: 0,
      description: "",
      title: "",
      typeAds: "",
    },
    resolver: yupResolver(createAdsValidSchema),
    mode: "all",
  });

  const [createAds] = useCreateServiceMutation();
  const [publishAds] = usePublishServiceMutation();
  const [addPhoto] = useAddPhotoToServiceMutation();

  const onSubmit = async (data: PropsForm) => {
    const response = await createAds({
      ...data,
    });

    const id = response.data?.id;
    if (!id) throw new Error("No ID returned from createAds");

    if (data.photo && data.photo.length > 0 && data.photo[0].file) {
      // Преобразуем файл в base64 с префиксом data:<mime>;base64,
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });

      let images: {image: string}[] = [];
      for (const photo of data.photo) {
        if (photo.file) {
          const base64Image = await toBase64(photo.file);
          const regex = new RegExp("^data:image/jpeg;");
          const base64ImageCorrected = base64Image.replace(
            regex,
            "data:image/jpg;"
          );
          images = [...images, {image: base64ImageCorrected}]


        }
      }
           await addPhoto({ id, images: images });
    }
    await publishAds(response.data?.id);

    navigate(`/catalogs/${data.type_id}/ads/${response.data.id}`);
  };
  const formRef = React.useRef<HTMLFormElement>(null);

  return (
    <section className={styles.section}>
      <FormProvider {...methods}>
        <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
          <Outlet
            context={{
              submitForm: () => {
                formRef.current?.dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                );
              },
            }}
          />
        </form>
      </FormProvider>
    </section>
  );
}
