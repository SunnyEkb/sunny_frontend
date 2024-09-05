import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import InputForm from "../../../user/components/input/InputForm";
import { useForm } from "react-hook-form";
import arrowBack from "../../../assets/icon/arrow-left.svg";
import fileter from "../../../assets/icon/filter.svg";
import ListServices from "./ListServices/ListServices";
import { useAppDispatch } from "../../../store/store";
import { changeSearchAction } from "../../../store/slices/serviceSlice";

interface ISearch {
  search: string;
}

export default function Catalog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className={style.catalog}>
      <header className={style.catalog__header}>
        <h1 className={style.catalog__headerTitle}>Солнечный Екб</h1>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style.catalog__searchContainer}
      >
        <img
          src={arrowBack}
          className={style.catalog__buttonArrow}
          alt="back"
          onClick={handleGoBack}
        />
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
          placeholder="Поиск услуги"
          name="search"
        />
      </form>

      <section>
        <header className={style.catalog__headerSection}>
          <h2 className={style.catalog__headerTitleSection}>Услуги</h2>
        </header>
      </section>

      <section className={style.catalog__sectionButton}>
        <button className={style.catalog__button} onClick={() => navigate('/type-catalog')}>
          <p className={style.catalog__buttonText}>Вид услуги</p>
          <img src={fileter} className={style.catalog__buttonArrow} />
        </button>
      </section>

      <ListServices />
    </div>
  );
}
