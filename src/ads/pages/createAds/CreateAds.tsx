import React from "react";
import styles from "./main.module.scss";
import { Outlet } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateServiceMutation } from "../../../store/entities/services/services";

export interface itemAds {
  nameAds: string;
  price: string;
}

export interface IPhoto {
  url: string;
  file: File;
}

interface PropsForm {
  viewAds: string;
  photo: IPhoto[];
  typeAds: string;
  experience: string;
  description: string;
  itemAds: itemAds[];
  venue: string; //место встречи
}

export default function CreateAds() {
  const methods = useForm({
    defaultValues: {
      itemAds: [],
      photo: [],
      viewAds: "",
      typeAds: "",
      venue: "",
      experience: "",
      description: "",
    },
    // resolver: yupResolver(),
    mode: "onChange",
  });

  const [createAds,] = useCreateServiceMutation();

  const onSubmit = async (data: PropsForm) => {
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
