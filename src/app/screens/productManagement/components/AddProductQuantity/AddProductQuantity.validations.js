import { object, number, mixed, boolean } from 'yup';

export const schema = object().shape({
  shippable: boolean(),
  stock: number().required(),
  shipmentLimit: number().required(),
  packageId: mixed().when('shippable', {
    is: true,
    then: mixed().required('Select box size'),
  }),
});
