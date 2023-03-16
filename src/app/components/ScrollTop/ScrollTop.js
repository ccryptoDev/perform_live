import React, { useState, useEffect } from 'react';

import ArrowUp from '../../../assets/svg/arrow-up.svg';

import './ScrollTop.scss';

const ScrollTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  const checkScrollTop = () => {
    if (window.pageYOffset <= 200) {
      setShowScroll(false);
    }
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showScroll ? (
        <button type="button" className="scroll-top" onClick={scrollTop}>
          <img className="scroll-top_img" src={ArrowUp} alt="arrow-up" />
        </button>
      ) : null}
    </>
  );
};

export default ScrollTop;
