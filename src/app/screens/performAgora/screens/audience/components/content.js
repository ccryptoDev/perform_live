import React from 'react';
import Top from './Top';
import Bottom from './Bottom';
import Stream from '../../../components/Streams';

import '../../../../../styles/content.scss';

const Content = ({ setExpandSidebar, expandSidebar, onGiftClick }) => {
  return (
    <>
      <div
        className={expandSidebar ? 'content-body active' : 'content-body'}
        id="content-body"
      >
        <div className="perform-body">
          <Top
            expandSidebar={expandSidebar}
            setExpandSidebar={setExpandSidebar}
          />
          <Stream fullScreenToggle={expandSidebar} />
          <Bottom fullScreenToggle={expandSidebar} onGiftClick={onGiftClick} />
        </div>
      </div>
    </>
  );
};

export default Content;
