import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { IMG } from '../../performanceScheduler.dependencies';
import { resetCover } from '../../state/performanceScheduler.actions';
import './coverPhoto.scss';

const GalleryList = ({ fileInfo, onDelete }) => (
  <div className="add-img img-preview">
    <img
      src={fileInfo.name ? window.URL.createObjectURL(fileInfo) : fileInfo}
      // src={IMG.PRODUCT_TEMP1}
      className="cover-img"
      alt="product"
    />
    <img
      src={IMG.DELETE_IMG}
      className="delete-icon"
      alt="times icon"
      onClick={onDelete}
      onKeyPress={() => {}}
      role="none"
    />
  </div>
);

GalleryList.propTypes = {
  onDelete: PropTypes.func,
  fileInfo: PropTypes.any,
};

const CoverPhoto = props => {
  const [imageFile, setImageFile] = useState(props.imageFile || null);
  const dispatch = useDispatch();
  const onImageFileChange = e => {
    e.persist();
    setImageFile(e.target.files[0]);
    props.onImageFileSelect(e.target.files[0]);
  };

  const handleCoverDelete = () => {
    setImageFile(null);
    dispatch(resetCover());
  };
  return (
    <div className="cover-photo-container">
      <h2 className="h2">Cover image</h2>
      <p>Add cover image for your promotional video</p>
      {!imageFile && (
        <div className="add-img__wrapper">
          <div
            className="add-img"
            onClick={() =>
              document.getElementById('productImageSelect').click()
            }
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
          >
            <img src={IMG.ADD_IMAGE} className="add-image" alt="add" />
            <span>Add image</span>{' '}
            <input
              type="file"
              name="file"
              onChange={onImageFileChange}
              id="productImageSelect"
              hidden
              accept="image/*"
            />
          </div>
          <div className="description">
            Image should be vertical and at least 375px × 800px
          </div>
        </div>
      )}

      {imageFile && (
        <div className="add-img__wrapper">
          <GalleryList fileInfo={imageFile} onDelete={handleCoverDelete} />
          <div className="description">
            Image should be vertical and at least 375px × 800px
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverPhoto;
