import React from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCreateServiceMutation } from "../../../store/entities/services/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdsValidSchema } from "./helpers";

export interface itemAds {
  nameAds: string;
  price: string;
}

export interface IPhoto {
  url?: string;
  file?: object;
}

interface PropsForm {
  viewAds?: string;
  photo?: IPhoto[] | null | undefined;
  experience: number;
  type_id: string;
  title: string;
  description: string;
  itemAds: itemAds[] | null | undefined;
  venue: string; //место встречи
}

export default function CreateAds() {
  const methods = useForm({
    defaultValues: {
      itemAds: null,
      photo: null,
      viewAds: "",
      type_id: "",
      venue: "",
      experience: 0,
      description: "",
      title: "",
    },
    resolver: yupResolver(createAdsValidSchema),
    mode: "all",
  });

  const [createAds,] = useCreateServiceMutation();

  const onSubmit = async (data: SubmitHandler<PropsForm>) => {
    console.log(data);
    await createAds(data);
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
