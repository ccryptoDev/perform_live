import React, { useEffect, useRef } from 'react';
import '../../../../../../styles/sidebar.scss';
import ChatList from '../../../../components/ChatList';

function MainSideBarView() {
  return (
    <>
      <div className="bottom-sidebar">
        <div className="chat-body">
          <ChatList />
        </div>
      </div>
    </>
  );
}

export default MainSideBarView;
