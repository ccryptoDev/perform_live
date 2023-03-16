import { object, number, string, bool, mixed } from 'yup';

export const schema = object().shape({
  name: string().required('Enter product name'),
  category: mixed().required('Select product category'),
  details: string().required('Enter product description'),
  price: number()
    .typeError('You must specify a number')
    .positive('Enter customer price')
    .required('Enter customer price'),
  sellerPrice: number()
    .typeError('You must specify a number')
    .positive('Enter your earnings')
    .required('Enter your earnings'),
  agree: bool().oneOf([true], 'This checkbox is required'),
});
