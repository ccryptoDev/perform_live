import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import './AddProductGallery.scss';

import ProductModal from '../../../../components/Common/ProductModal/ProductModal';
import ARComingSoon from '../../../../components/Common/ARComingSoon';
import ProductGalleryItem from '../../../../components/ProductGalleryItem';
import { NextButton } from '../../../../components/Common/Button/Button';
import useApi from '../../../../hooks/api';

const AddProductGallery = props => {
  const [files, setFiles] = useState(
    Array.from({ length: 4 }, (_, i) => props.data.gallery[i]),
  );
  const [dragId, setDragId] = useState();
  const [saveAttempt, setSaveAttempt] = useState(false);
  const onFileChange = index => e => {
    e.persist();
    if (!e.target) return;
    setFiles(prevState => {
      return prevState.map((el, i) => (i === index ? e.target.files[0] : el));
    });
  };

  const { deletePerformerProductIdIdGalleryGalleryId } = useApi('performer');
  const deleteImage = useMutation(deletePerformerProductIdIdGalleryGalleryId);

  const handleDeleteImg = index => {
    setFiles(prevFiles => {
      const removedFile = prevFiles[index];

      // check if this contains absolute url and id then remove it from product as well

      if (removedFile.id && removedFile.url) {
        deleteImage.mutate({
          galleryId: removedFile.id,
          id: props.productId,
        });
      }

      return prevFiles.map((el, i) => (i === index ? null : el));
    });
  };

  const handleDrag = ev => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = ev => {
    const dragBox = files[dragId];
    const dropBox = files[ev.currentTarget.id];
    files[dragId] = dropBox;
    files[ev.currentTarget.id] = dragBox;

    setFiles([...files]);
  };

  return (
    <ProductModal
      title={props.productId ? 'Edit Product' : 'New Product'}
      onClose={props.onClose}
      currentStep={1}
      subtitle="Photo Gallery"
    >
      <div className="gallery-lists">
        {files.map((file, index) => (
          <ProductGalleryItem
            error={!!file && index === 0 && saveAttempt}
            file={file}
            id={index}
            onDelete={() => handleDeleteImg(index)}
            // eslint-disable-next-line react/no-array-index-key
            key={`file_${index}`}
            isCover={index === 0}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            imageNumber={index}
            onFileChange={onFileChange(index)}
          />
        ))}
      </div>

      <ARComingSoon />

      <NextButton
        onClick={() => props.onNext({ gallery: files })}
        disabled={!files.length}
      >
        next step
      </NextButton>
    </ProductModal>
  );
};

AddProductGallery.propTypes = {
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.object,
  productId: PropTypes.number,
};

export default AddProductGallery;
