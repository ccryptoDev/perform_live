import React, { useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const EmojiPicker = ({ showEmoji, onEmojiClick, onHide }) => {
  const [showEmojiPicker, setShowEmoji] = React.useState(showEmoji);
  useEffect(
    () => {
      setShowEmoji(showEmoji);
    },
    [showEmoji],
  );
  return (
    <>
      <div
        className="emoji-picker"
        style={showEmojiPicker ? { display: 'flex' } : { display: 'none' }}
        onMouseLeave={() => {
          setShowEmoji(false);
          onHide();
        }}
      >
        <Picker
          onClick={onEmojiClick}
          showPreview={false}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '20px',
          }}
        />
      </div>
    </>
  );
};

export default EmojiPicker;
