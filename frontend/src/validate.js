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

const loginSchema = () => {
  yup.object().shape({
    name: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'Имя должно быть короче 21 символа')
  })
}
export {schema, loginSchema}