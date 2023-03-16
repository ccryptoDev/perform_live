import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { useMutation } from 'react-query';
import { FormikProvider, useFormik } from 'formik';
import { object, ref, string } from 'yup';
import { ControledLabeledInput } from '../../../components/LabeledInput/LabeledInput';
import Button from '../../../components/Common/Button';
import useApi from '../../../hooks/api';
import plToast from '../../../utils/toast';

const schema = object().shape({
  oldPassword: string()
    .min(8, 'must be at least 8 characters')
    .required('Old password is required'),
  newPassword: string()
    .min(8, "must be at least 8 characters'")
    .required('Password is required'),
  confirmPassword: string().oneOf(
    [ref('newPassword'), null],
    'Passwords must match',
  ),
});

function ChangePasswordForm({ onClose, onForgetPass }) {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: schema,
  });
  const { postEmailNewPassword } = useApi('email');
  const changePassword = useMutation(postEmailNewPassword, {
    onSuccess: () => {
      plToast.success('Password changed successfully');
      onClose();
    },
    onError: ({ data }) => {
      plToast.error(data.message);
    },
  });
  const handlePasswordChange = useCallback(() => {
    const { oldPassword, newPassword } = formik.values;
    if (formik.isValid) {
      changePassword.mutate({ oldPassword, newPassword });
    }
  });

  return (
    <div className="change-password-form">
      <FormikProvider value={formik}>
        <ControledLabeledInput
          type="password"
          name="oldPassword"
          label="Enter your password"
        />
        <ControledLabeledInput
          type="password"
          name="newPassword"
          label="Create a new password"
        />
        <ControledLabeledInput
          type="password"
          name="confirmPassword"
          label="Confirm new password"
        />
        <div className="change-password-form__action-btns">
          <Button
            background="transparent"
            border="gradient"
            onClick={onClose}
            disabled={changePassword.isLoading}
          >
            CANCEL
          </Button>
          <Button
            onClick={handlePasswordChange}
            disabled={changePassword.isLoading}
          >
            SAVE
          </Button>
        </div>
        <Button
          type="secondary"
          background="transparent"
          textColor="blue"
          onClick={onForgetPass}
        >
          Forgot password?
        </Button>
      </FormikProvider>
    </div>
  );
}

ChangePasswordForm.propTypes = {
  onClose: propTypes.func,
  onForgetPass: propTypes.func,
};

export default ChangePasswordForm;
