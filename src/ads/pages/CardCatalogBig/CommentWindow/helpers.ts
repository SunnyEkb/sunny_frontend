import * as Yup from "yup";

export const schemaComments = Yup.object().shape({
  feedback: Yup.string().required("Это поле обязательное"),
  rating: Yup.number().required(),
});
