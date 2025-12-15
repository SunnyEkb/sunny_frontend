import * as Yup from "yup";

const createAdsValidSchema = Yup.object().shape({
  title: Yup.string().required("Это поле обязательное"),
  category_id: Yup.number().required("Это поле обязательное").nullable(),
  description: Yup.string().required("Это поле обязательное"),
  price: Yup.number().nullable(),
  condition: Yup.string().required("Укажите состояние товара"),
  address: Yup.string(),
  photo: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().optional(),
        file: Yup.mixed(),
      })
    )
    .nullable(),
});

const createServicesValidSchema = Yup.object().shape({
  title: Yup.string().required("Это поле обязательное"),
  description: Yup.string().trim().required("Это поле обязательно"),
  category_id: Yup.number().nullable(),
  venue: Yup.string().required("Укажите место встречи"),
  address: Yup.string(),
  experience: Yup.number().nullable(),
  price_list_entris: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string(),
        price: Yup.number()
          .required()
          .positive("Цифра должна быть положительной")
          .default(0),
      })
    )
    .required("Добавьте как минимум одну услугу"),
  photo: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().optional(),
        file: Yup.mixed(),
      })
    )
    .nullable(),
});

export const validationSchemas: Record<TypeOfAd, Yup.AnyObjectSchema> = {
  ads: createAdsValidSchema,
  services: createServicesValidSchema,
};


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

export interface CategoriesAd {
  id: number;
  title: string;
  subcategories: Array<CategoriesAd> | null;
  img: string;
}

export type TypeOfAd = "ads" | "services";

export const defaultTypeAd: Record<TypeOfAd, string> = {
  services: "Услуги",
  ads: "Вещи, электроника, хобби и прочее",
};

export const conditionOption = [
  {
    value: "Б/у",
    label: "Б/у"
  },
  {
    value: "Новое",
    label: "Новое"
  }
]



