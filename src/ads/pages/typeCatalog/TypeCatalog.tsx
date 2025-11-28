import React from "react";
import style from "./type.module.scss";
import InputForm from "../../../user/components/input/InputForm";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/store";
import { useLoaderData } from "react-router-dom";
import { changeSearchAction } from "../../../store/slices/serviceSlice";
import RowCatalog from "./rowCatalog/RowCatalog";

interface ISearch {
  search: string;
}

export interface TypeCatalog {
  id: string;
  title: string;
  subcategories: TypeCatalog[] | null;
}

export const loaderTypesCatalog = async () => {
  const response = await fetch("https://sunnyekb.ru/api/v1/services/categories/");

  return response;
};

export default function TypeCatalog() {
  const allTypeCatalog = useLoaderData() as TypeCatalog[];
  const [selectedSub, setSelectedSub] = React.useState<TypeCatalog[]>([]);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISearch>({
    mode: "onChange",
  });

  const onSubmit = (data: ISearch) => {
    dispatch(changeSearchAction(data.search));
  };

  const navigateAdsType = () => {
    console.log("Нужно отправить на бек и отфилтровать", selectedSub);
  };
  return (
    <main className={style.main}>
      <header className={style.catalog__header}>
        <h1 className={style.catalog__headerTitle}>Вид услуги</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.catalog__searchContainer}
        >
          <InputForm
            {...register("search", {
              required: "Введите название услуги",
              minLength: {
                value: 2,
                message: "Минимум два символа",
              },
              maxLength: {
                value: 40,
                message: "Максимум сорок символов",
              },
            })}
            errors={errors}
            type="text"
            placeholder="Поиск"
            name="search"
          />
        </form>
      </header>

      <section className={style.section}>
        <div className={style.listCatalog}>
          {allTypeCatalog.map((item) => {
            return (
              <RowCatalog
                item={item}
                key={item.id}
                setSelectedSub={setSelectedSub}
                selectedSub={selectedSub}
              />
            );
          })}
        </div>
      </section>

      <div className={style.footer}>
        {" "}
        <button
          type="button"
          className={style.button}
          onClick={navigateAdsType}
        >
          Показать
        </button>
      </div>
    </main>
  );
}
