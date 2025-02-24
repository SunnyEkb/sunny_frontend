import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../store/store";
import { changeSearchAction } from "../../../../store/slices/serviceSlice";
import style from "./searchWindow.module.scss";

interface ISearch {
  search: string;
}

export default function SearchWindow({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISearch>({
    mode: "onChange",
  });

  const onSubmit = (data: ISearch) => {
    dispatch(changeSearchAction(data.search));
  };

  const handleReset = () => {
    reset({ search: "" });
    dispatch(changeSearchAction(""));
  };

  return (
    <div className={style.searchWindow}>
      <button className={style.searchWindow__closeButton} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className={style.searchWindow__form}>
        <input
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
          type="text"
          placeholder="Поиск услуги"
          className={style.searchWindow__input}
        />
        {errors.search && <p className={style.searchWindow__error}>{errors.search.message}</p>}
        <div className={style.searchWindow__buttons}>
          <button type="submit" className={style.searchWindow__searchButton}>
            Искать
          </button>
          <button type="button" className={style.searchWindow__resetButton} onClick={handleReset}>
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
}
