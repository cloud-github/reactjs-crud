import React from "react";
import PropTypes from "prop-types";
import { Picker } from "emoji-mart";

const stylesEmoji = {
  fontFamily: "sans-serif",
  paddingBottom: 3,
  position: "absolute",
  marginLeft: 403,
  zIndex: 21
};

const EmojiMart = props => {
  const { showEmojiPopup, setEmoji } = props;
  return (
    <div className="emojidiv" style={stylesEmoji}>
      {showEmojiPopup && <Picker onSelect={setEmoji} set="emojione" />}
    </div>
  );
};

EmojiMart.propTypes = {
  showEmojiPopup: PropTypes.bool.isRequired,
  setEmoji: PropTypes.func.isRequired
};

export default EmojiMart;
