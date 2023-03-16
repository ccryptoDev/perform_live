import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../../styles/sidebar.scss';
import { IMG } from '../performer.dependencies';

// import product1 from '../../assets/image/performlive/product1.png';
// import tryar from '../../assets/svg/performlive/tryar.svg';
// import addcart from '../../assets/svg/performlive/addcart.svg';
// import goback from '../../assets/svg/performlive/goback.svg';

function Product({ onBack }) {
  return (
    <>
      <div className="product-description">
        <div className="go-back">
          {/* <img className="goback-icon" src={goback} alt="go back"></img> */}
          <span href="#" className="go-back" onClick={onBack}>
            Go Back
          </span>
        </div>
        <div className="product-avatar">
          <img className="product-img" src={IMG.PRODUCT1} alt="product back" />
        </div>
        <div className="product-info">
          <div className="product-price">
            <span className="old">
              $689.
              <small>99</small>
            </span>
            <span className="new">
              $100.
              <small>00</small>
            </span>
          </div>
          <div className="product-name">
            Novation 39X Circuit Mono Station Paraphonic Analog Synth
          </div>
          <div className="product-notes">
            Circuit Mono Station is a paraphonic analog synthesizer that
            originates from the Bass Station, with three sequencer tracks that
            benefit from the 32 velocity-sensitive RGB pads found on Circuit.
            The synth has two oscillators, three distortion modes, plus one
            multi-mode filter.
          </div>
          <div className="try-ar">
            <img className="tryar-icon" src={IMG.TRYAR} alt="Try QR" />
            <Link to="#" className="tryar-btn">
              Try in AR
            </Link>
          </div>
          <div className="addcart-action">
            <img className="addcart-icon" src={IMG.ADDCART} alt="Add to cart" />
            <Link to="#" className="addcart-btn">
              Add to Cart
            </Link>
          </div>
          <div className="count-product">
            <span>Qty</span>
            <div className="counter-btn">
              <Link to="#" className="min-btn">
                -
              </Link>
              <span>1</span>
              <Link to="#" className="plus-btn">
                +
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
