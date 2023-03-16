import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-input-slider';
import AvatarEditor from 'react-avatar-editor';
import './UploadAvatarModal.scss';
import Button from '../../../../components/Common/Button/Button';
import IMG from '../../../../utils/images';

import { useApi } from '../../../../hooks/api';

const style = {
  track: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: '2px',
    width: '400px',
    cursor: 'pointer',
  },
  active: {
    backgroundColor: 'white',
  },
  thumb: {
    width: 25,
    height: 25,
    opacity: 1,
  },
};

const UploadAvatarModal = props => {
  const {
    heading,
    imageUrl,
    onChange,
    confirmText,
    cancelText,
    cancelCallBack,
  } = props;

  const [image, setImage] = useState(imageUrl);
  const [state, setState] = useState(1);
  const hiddenFileInput = useRef(null);
  const { postFileUpload } = useApi('file');
  let editor = useRef();

  useEffect(
    () => {
      setImage(imageUrl);
    },
    [imageUrl],
  );

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setImage(fileUploaded);
  };

  const handleUploadAvatar = () => {
    if (!image) {
      console.log('please select the photo!');
    } else {
      if (editor) {
        const canvas = editor.getImage();
        canvas.toBlob(async blob => {
          if (blob) {
            var file = new File([blob], 'avtar', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            const formData = new FormData();
            formData.append('file', file);
            try {
              const fileUploadRes = await postFileUpload(formData);
              onChange(fileUploadRes.url);
            } catch (error) {
              console.log('error during upload avatar: ', error);
            }
          }
        });
      }
    }
  };
  return (
    <div className="upload-modal">
      <div className="modal-bg" />
      <div className="modal-body">
        <div className="close">
          <img
            src={IMG.MODAL_CLOSE}
            className="close-icon"
            alt="close icon"
            onClick={cancelCallBack}
            role="none"
          />
        </div>
        <h3 className="modal-title">{heading}</h3>
        <div className="avatar">
          {image ? (
            <AvatarEditor
              ref={res => {
                editor = res;
              }}
              width={200}
              height={200}
              image={image}
              border={[100, 30]}
              borderRadius={250}
              scale={state}
            />
          ) : (
            <img src={IMG.USER} className="default-avatar" />
          )}
          <input
            type="file"
            className="input-file"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </div>
        <div className="file-ctrl">
          <div className="ctrl-title">
            <img src={IMG.ZOOM_ICON} />
            <span>Drag and move to reposition</span>
          </div>
          <div className="ctrl-zoom">
            <Button
              type="secondary"
              size="small"
              background="transparent"
              textColor="white"
              onClick={() => {
                if (state > 1 && state <= 2) {
                  setState(state - 0.05);
                }
              }}
            >
              -
            </Button>
            <Slider
              axis="x"
              xstep={0.05}
              xmin={1}
              xmax={2}
              styles={style}
              x={state}
              onChange={({ x }) => setState(parseFloat(x.toFixed(2)))}
            />
            <Button
              type="secondary"
              size="small"
              background="transparent"
              textColor="white"
              onClick={() => {
                if (state >= 1 && state < 2) {
                  setState(state + 0.05);
                }
              }}
            >
              +
            </Button>
          </div>
          <div className="ctrl-btn">
            <Button
              className="upload-btn"
              type="primary"
              size="medium"
              background="transparent"
              border="gradient"
              onClick={event => {
                hiddenFileInput.current.click();
                setState(1);
              }}
            >
              <img className="upload-avatar" src={IMG.UPLOAD_AVATAR} />
              <span className="btn-title">UPLOAD PHOTO</span>
            </Button>
          </div>
          <div className="ctrl-remove">
            <Button
              type="secondary"
              size="large"
              background="transparent"
              textColor="pink"
              onClick={() => {
                setState(1);
                setImage(null);
              }}
            >
              <img src={IMG.RECYCLE} />
              Remove Photo
            </Button>
          </div>
        </div>
        <div className="modal-action">
          <Button
            className="delete-action"
            type="primary"
            size="medium"
            background="transparent"
            border="gradient"
            onClick={cancelCallBack}
          >
            <span className="btn-title">{cancelText || 'Cancel'}</span>
          </Button>
          <Button
            className="cancel-action"
            type="primary"
            size="large"
            background="gradient"
            onClick={handleUploadAvatar}
          >
            <span className="btn-title">{confirmText || 'Save'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

UploadAvatarModal.propTypes = {
  heading: PropTypes.string,
  confirmCallBack: PropTypes.func,
  cancelCallBack: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  uploadAvatar: PropTypes.func,
};

export default UploadAvatarModal;
