import * as yup from "yup";

const schema = (channels) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Обязательное поле")
      .min(3, "От 3 до 20 символов")
      .max(20, "Имя должно быть короче 21 символа")
      .notOneOf(channels, "Имя канала должно быть уникальным"),
  });

const loginSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Обязательное поле")
    .min(3, "От 3 до 20 символов")
    .max(20, "Имя должно быть короче 21 символа"),
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Пароль должен быть не менее 6 символов"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
    .required("Пароли должны совпадать"),
});

export { schema, loginSchema };
