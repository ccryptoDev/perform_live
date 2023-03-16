import React, { useState } from 'react';

const Item = props => {
  const { title } = props;
  const [hover, setHover] = useState(false);
  const ctrlMouse = () => {
    setHover(!hover);
  };
  return (
    <div
      className={!hover ? 'cat-item' : 'cat-item hover'}
      onMouseOver={ctrlMouse}
      onMouseOut={ctrlMouse}
    >
      <span>{title}</span>
    </div>
  );
};

const Category = props => {
  const { categories } = props;
  return (
    <div className="cat-list">
      {categories.map((item, index) => (
        <Item key={index} title={item} />
      ))}
    </div>
  );
};

export default Category;
