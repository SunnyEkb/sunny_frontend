import * as Yup from "yup";

export const createAdsValidSchema = Yup.object().shape({
  viewAds: Yup.string().trim(),
  type_id: Yup.string().required("Это поле обязательное"),
  venue: Yup.string().trim(),
  experience: Yup.number().max(50, "Число не должно быть больше 50").required(),
  description: Yup.string().required("Это поле обязательное"),
  title: Yup.string().required("Это поле обязательное"),
  typeAds: Yup.string().trim(),
  itemAds: Yup.array()
    .of(
      Yup.object().shape({
        nameAds: Yup.string().required(),
        price: Yup.number()
          .required()
          .positive("Цифра должна быть положительной"),
      })
    )
    .nullable(),
  photo: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().optional(),
        file: Yup.mixed(),
      })
    )
    .nullable(),
});

export const defaultAds = [
  {
    id: 1,
    title: "Красота и здоровье",
  },
  {
    id: 2,
    title: "Спорт",
  },
  {
    id: 3,
    title: "Для детей",
  },
  {
    id: 4,
    title: "Выпечка и сладости",
  },
  {
    id: 5,
    title: "Цветы",
  },
  {
    id: 6,
    title: "Домашние животные",
  },
  {
    id: 7,
    title: "Другое",
  },
];

export const defaultTypeAds = [
  {
    id: 1,
    title: "Маникюр",
  },
  {
    id: 2,
    title: "Услуги прикмахера",
  },
  {
    id: 3,
    title: "Ресницы",
  },
  {
    id: 4,
    title: "Массаж",
  },
  {
    id: 5,
    title: "Косметология",
  },
  {
    id: 6,
    title: "Макияж",
  },
  {
    id: 7,
    title: "Другое",
  },
];
