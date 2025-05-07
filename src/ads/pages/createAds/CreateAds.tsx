import React from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateServiceMutation } from "../../../store/entities/services/services";
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
      typeAds: ""
    },
    resolver: yupResolver(createAdsValidSchema),
    mode: "all",
  });

  const [createAds] = useCreateServiceMutation();

  const onSubmit = async (data: PropsForm) => {
    console.log(data);
    await createAds({
      ...data,
    });
    // navigate('/');
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
