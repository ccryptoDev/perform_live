import React from 'react';
import '../../../../../styles/expand.scss';

const Products = ({ productInfo }) => (
  <>
    <div className="products-ban">
      <img
        src={
          productInfo.gallery &&
          productInfo.gallery[0] &&
          productInfo.gallery[0].url
        }
        className="products-img"
        alt="products icons"
      />
      <div className="products-text">{productInfo.name}</div>
      <div className="price-text">$ {productInfo.price}</div>
      <button className="add-cart">Add to cart</button>
      <div className="border-line" />
    </div>
  </>
);

const ExpandSidebar = props => {
  const items = props.products;
  const [expand, setExpand] = React.useState(false);
  return (
    <>
      <div className={expand ? 'expand-side active' : 'expand-side'}>
        {props.products.map(product => (
          <Products productInfo={product} key={product.id} />
        ))}
      </div>
      <button
        className={expand ? 'more-btn active' : 'more-btn'}
        onClick={() => setExpand(!expand)}
        type="button"
      >
        {expand ? 'Show less' : 'Show more'}
        <span className={expand ? 'down-icon active' : 'down-icon'} />
      </button>
    </>
  );
};

export default ExpandSidebar;
