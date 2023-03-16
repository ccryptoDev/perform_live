import React from 'react';
import { string, node } from 'prop-types';
import './styles.scss';

const ScreenWrap = ({ cardTitle, children }) => (
  <div className="screen-container">
    <div className="screen-content-container">
      <div className="content">
        <div className="card">
          <h1 className="card-title">{cardTitle}</h1>
          {children}
        </div>
      </div>
    </div>
  </div>
);

ScreenWrap.propTypes = {
  cardTitle: string,
  children: node,
};

export default ScreenWrap;
