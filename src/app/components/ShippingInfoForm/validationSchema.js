import * as yup from 'yup';

const validationSchema = yup.object({
  firstName: yup.string().required('Enter your first name'),
  lastName: yup.string().required('Enter your last name'),
  street: yup.string().required('Enter the address'),
  city: yup.string().required('Enter the city'),
  state: yup
    .string()
    .length(2, `State must be equal to 2 characters`)
    .required('Enter the state / province / region'),
  country: yup
    .string()
    .length(2, `Country must be equal to 2 characters`)
    .required('Enter the country'),
  zip: yup
    .string()
    .required('Enter the zip / postal code')
    .when('country', {
      is: 'United States',
      then: yup
        .string()
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid postal code'),
    }),
  // .when('country', {
  //   is: 'Canada',
  //   then: yup.string().matches(/^[A-Za-z]\d[A-Za-z][ -\]?\d[A-Za-z]\d$/, 'Invalid postal code'),
  // })
  phone: yup
    .string()
    .when('country', {
      is: country => ['United States'].includes(country),
      then: yup
        .string()
        .matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone nunber'),
    })
    .required(),
  email: yup
    .string()
    .email('Enter valid email')
    .required('Enter your email'),
});

export default validationSchema;
