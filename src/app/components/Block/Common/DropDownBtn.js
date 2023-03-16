import React, { useState, useEffect, useRef } from 'react';

const DropDownBtn = props => {
  const { direction = 'left', values, onClick, onClickOut } = props;

  const dropContentRef = useRef(null);
  useEffect(
    () => {
      function handleClickOutside(event) {
        if (
          dropContentRef.current &&
          !dropContentRef.current.contains(event.target)
        ) {
          onClickOut();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [dropContentRef],
  );
  return (
    <div
      ref={dropContentRef}
      className={`dropContent ${(direction == 'right' && 'right') || 'left'}`}
    >
      {values.map((item, index) => (
        <div
          key={index}
          className="dropItem"
          onClick={e => {
            onClick(item, e);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DropDownBtn;
