import React from 'react';
import propTypes from 'prop-types';
import { useFormik, FormikProvider } from 'formik';
import { object, string } from 'yup';
import Button from '../../../components/Common/Button';
import { ControledLabeledInput } from '../../../components/LabeledInput/LabeledInput';

const schema = object().shape({
  newPassword: string()
    .min(8, 'must be at least 8 characters')
    .required('Password is required'),
});

const CreatePasswordForm = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validationSchema: schema,
  });

  return (
    <div className="change-password-form">
      <FormikProvider value={formik}>
        <ControledLabeledInput
          type="password"
          name="newPassword"
          label="Create a new password"
        />
        <div className="change-password-form__action-btns">
          <Button background="transparent" border="gradient" onClick={onClose}>
            CANCEL
          </Button>
          <Button>SAVE</Button>
        </div>
      </FormikProvider>
    </div>
  );
};

CreatePasswordForm.propTypes = {
  onClose: propTypes.func,
};

export default CreatePasswordForm;
