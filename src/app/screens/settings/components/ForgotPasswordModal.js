import React from 'react';
import propTypes from 'prop-types';
import { useFormik, FormikProvider } from 'formik';
import { object, string } from 'yup';
import { useMutation } from 'react-query';
import Button from '../../../components/Common/Button';
import { ControledLabeledInput } from '../../../components/LabeledInput/LabeledInput';
import IMG from '../../../utils/images';
import useApi from '../../../hooks/api';
import plToast from '../../../utils/toast';

const schema = object().shape({
  email: string()
    .email('Should be valid email')
    .required('the field is required'),
});

const ForgotPasswordModal = ({ onClose }) => {
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      email: '',
    },
  });

  const { postEmailResetPassword } = useApi('email');
  const resetPassword = useMutation(postEmailResetPassword, {
    onSuccess: () => {
      plToast.success(
        `Email with confirmation link sent to ${formik.values.email}`,
      );
      onClose();
    },
    onError: res => {
      plToast.error(res.data.message);
    },
  });

  const handleGetLoginLink = () => {
    if (!formik.isValid) return;

    resetPassword.mutate({
      email: formik.values.email,
      codeType: 'link',
    });
  };

  return (
    <div className="forgotpsw-modal">
      <div className="modal-bg" />
      <div className="modal-body">
        <div className="modal-top">
          <div className="modal-title">
            <div className="title-text">Forgot </div>
            <div className="title-text--dark"> your password?</div>
          </div>
          <img
            src={IMG.MODAL_CLOSE}
            className="close-icon"
            alt="close icon"
            onClick={onClose}
            role="none"
          />
        </div>
        <div className="title-description">
          Enter your email address and we will send you a link to restore access
          to your account.
        </div>
        <FormikProvider value={formik}>
          <ControledLabeledInput
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <div className="change-password-form__action-btns">
            <Button
              size="large"
              onClick={handleGetLoginLink}
              spinner={resetPassword.isLoading}
              disabled={!formik.isValid || resetPassword.isLoading}
            >
              get login link
            </Button>
          </div>
        </FormikProvider>
      </div>
    </div>
  );
};

ForgotPasswordModal.propTypes = {
  onClose: propTypes.func,
};

export default ForgotPasswordModal;
