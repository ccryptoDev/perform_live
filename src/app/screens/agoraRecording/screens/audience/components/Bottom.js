import React from 'react';

import '../../../../../styles/content.scss';
import DisplayReaction from '../../../../performAgora/components/Reactions/displayReaction';

const Bottom = ({ fullScreenToggle }) => {
  return (
    <>
      <div className="perform-bottom">
        <div className="reaction-box">
          <DisplayReaction />
        </div>
      </div>
    </>
  );
};

export default Bottom;
