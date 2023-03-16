import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './ProductGalleryItem.scss';
import { IMG } from '../../screens/productManagement/productManagement.dependencies';

const AddProductBtn = ({ handleDrag, handleDrop, onFileChange, id }) => {
  const textInput = useRef(null);

  return (
    <div
      className="add-img add-image__btn"
      id={id}
      draggable
      onDragOver={ev => ev.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
      onClick={() => textInput.current.click()}
      onKeyPress={() => textInput.current.click()}
      role="button"
      tabIndex="0"
    >
      <img src={IMG.ADD_IMAGE} className="add-image" alt="add" />
      <p className="add-image__label">Add image</p>
      <input
        type="file"
        name="file"
        value=""
        onChange={onFileChange}
        ref={textInput}
        hidden
        accept="image/*"
      />
    </div>
  );
};

AddProductBtn.propTypes = {
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
  onFileChange: PropTypes.func,
};

const ProductImageLoaded = ({
  handleDrag,
  handleDrop,
  file,
  onDelete,
  isCover,
  id,
}) => (
  <div
    className="gallery-list"
    draggable
    onDragOver={ev => ev.preventDefault()}
    onDragStart={handleDrag}
    onDrop={handleDrop}
    id={id}
  >
    <div className="product-item">
      <img
        src={file.url ? file.url : window.URL.createObjectURL(file)}
        className="product-list"
        alt="product"
      />
      {onDelete && (
        <img
          src={IMG.DELETE_IMG}
          className="times-icon"
          alt="times icon"
          onClick={onDelete}
          onKeyPress={() => {}}
          role="none"
        />
      )}
      {isCover && <div className="cover-shot">Covershot</div>}
    </div>
  </div>
);

ProductImageLoaded.propTypes = {
  onDelete: PropTypes.func,
  file: PropTypes.object,
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
  isCover: PropTypes.bool,
};

export const ProductGalleryItem = ({ file, ...rest }) => {
  return file ? (
    <ProductImageLoaded file={file} {...rest} />
  ) : (
    <AddProductBtn {...rest} />
  );
};

ProductGalleryItem.propTypes = {
  onDelete: PropTypes.func,
  file: PropTypes.object,
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
  imageNumber: PropTypes.number,
};

export default ProductGalleryItem;
