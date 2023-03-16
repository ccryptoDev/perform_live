import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './category.scss';

const CategoryItem = props => {
  const { title } = props;
  return (
    <button
      type="button"
      className={`cat-item ${props.activeCatIndex !== -1 && 'button'}`}
      onClick={() => props.onCatClick(title.toLowerCase())}
    >
      <span className="button__label">{title}</span>
    </button>
  );
};

CategoryItem.propTypes = {
  onCatClick: PropTypes.func,
  title: PropTypes.string,
  activeCatIndex: PropTypes.number,
};

const Category = ({ categories, onSelect, selectedCategories }) => {
  return (
    <div className="cat-list">
      {categories.map(item => (
        <CategoryItem
          key={item}
          title={item}
          onCatClick={onSelect}
          activeCatIndex={selectedCategories.indexOf(item.toLowerCase())}
        />
      ))}
    </div>
  );
};

Category.propTypes = {
  categories: PropTypes.array,
  onSelect: PropTypes.func,
  selectedCategories: PropTypes.array,
};

export default memo(Category);
