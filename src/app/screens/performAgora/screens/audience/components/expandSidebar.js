import React from 'react';
import '../../../../../styles/expand.scss';
import cn from 'classnames';

const Product = ({ productInfo, isFocused, addProductToCart }) => (
  <div className="products-ban product">
    <img
      src={
        productInfo.gallery &&
        productInfo.gallery[0] &&
        productInfo.gallery[0].url
      }
      className={cn('products-img', { focused: isFocused !== -1 })}
      alt="products icons "
    />
    <div className="products-text">{productInfo.name}</div>
    <div className="price-text">$ {productInfo.price}</div>
    <button className="add-cart" onClick={() => addProductToCart(productInfo)}>
      buy now
    </button>
  </div>
);

const ExpandSidebar = props => {
  const [expand, setExpand] = React.useState(false);

  return (
    <>
      <div className={expand ? 'expand-side active' : 'expand-side'}>
        {props.products.map(product => (
          <Product
            productInfo={product}
            key={product.id}
            isFocused={props.focusedProducts.indexOf(product.id)}
            addProductToCart={props.addProductToCart}
          />
        ))}
      </div>
      {props.products.length > 1 && (
        <button
          className={expand ? 'more-btn active' : 'more-btn'}
          onClick={() => setExpand(!expand)}
          type="button"
        >
          {expand ? 'Show less' : 'Show more'}
          <span className={expand ? 'down-icon active' : 'down-icon'} />
        </button>
      )}
    </>
  );
};

export default ExpandSidebar;
