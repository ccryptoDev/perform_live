import { object, number, string, bool, mixed } from 'yup';

export const schema = object().shape({
  email: string()
   .email()
   .required('The field is required'),
  phone: string().required('The field is required'),
});
