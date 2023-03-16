import React from 'react';
import Top from './Top';
import Bottom from './Bottom';
import Stream from '../../../components/Streams';

import '../../../../../styles/content.scss';

const Content = ({ setExpandSidebar, expandSidebar }) => {
  return (
    <>
      <div
        className={expandSidebar ? 'content-body active' : 'content-body'}
        id="content-body"
      >
        <div className="perform-body">
          <Top />
          <Stream fullScreenToggle={expandSidebar} />
          <Bottom />
        </div>
      </div>
    </>
  );
};

export default Content;
