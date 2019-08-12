import produce from "immer";
import autoBind from "auto-bind";
import React, { Component } from "react";
import { emojiIndex } from "emoji-mart";
import * as utils from "react-mentions/lib/utils";
import OutsideClickHandler from "react-outside-click-handler";
import { MentionsInput, Mention } from "react-mentions";
import EmojiMart from "../emojiMart";
import defaultStyle from "./defaultStyle";

const errorSpan = {
  position: "relative",
  color: "red"
};

export default class MentionsTextInput extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      touched: false,
      showEmojiPopup: false,
      text: props.input.value.rawText || "",
      charCounter: this.calculateCounter(props.input.value.text || "")
    };
    this.mentionsRef = React.createRef();
    this.selection = { start: 0, end: 0 };
    this.markup = "@[__display__](__type__:__id__)";
  }

  onOutsideEmojiBoxClick() {
    this.setState(
      produce(draft => {
        draft.showEmojiPopup = false;
      })
    );
  }

  setTouched() {
    this.setState(
      produce(draft => {
        draft.touched = true;
      })
    );
  }

  handleSelection({ target: { selectionEnd, selectionStart } }) {
    this.selection = { start: selectionStart, end: selectionEnd };
  }

  displayTransform(_, display, type) {
    return type == "emojis" ? display : `{{${display}}}`;
  }

  emojiRenderSuggestion(entry) {
    return `${entry.name}${entry.display}`;
  }

  canInsertText(text) {
    const { maxTextLength, enforceMaxTextLength } = this.props;
    return (
      !maxTextLength || (!enforceMaxTextLength || text.length <= maxTextLength)
    );
  }

  calculateCounter(text) {
    const { maxTextLength } = this.props;
    return maxTextLength - text.length;
  }

  handleChange(event, newValue, newPlainTextValue) {
    if (!this.canInsertText(newPlainTextValue)) return;
    this.updateText(newPlainTextValue, newValue);
  }

  handleEmojiPopup() {
    this.setState(
      produce(draft => {
        draft.showEmojiPopup = !draft.showEmojiPopup;
      })
    );
  }

  updateText(newPlainTextValue, newValue, cursorPos) {
    const { input } = this.props;
    this.setState(
      produce(draft => {
        draft.charCounter = this.calculateCounter(newPlainTextValue);
        draft.text = newValue;
      }),
      () => {
        if (cursorPos !== undefined) {
          this.mentionsRef.current.selectionStart = cursorPos;
          this.mentionsRef.current.selectionEnd = cursorPos;
          this.mentionsRef.current.focus();
        }
      }
    );
    input.onChange({ text: newPlainTextValue, rawText: newValue });
  }

  insertEmoji(e) {
    const icon = e.native;
    const { text } = this.state;
    let newPlainText =
      utils.getPlainText(text, this.markup, this.displayTransform) + icon;

    if (!this.canInsertText(newPlainText)) return;

    const start = utils.mapPlainTextIndex(
      text,
      this.markup,
      this.selection.start,
      "START",
      this.displayTransform
    );

    const end = utils.mapPlainTextIndex(
      text,
      this.markup,
      this.selection.end,
      "START",
      this.displayTransform
    );

    const beginning =
      utils.findStartOfMentionInPlainText(
        text,
        this.markup,
        this.selection.start,
        this.displayTransform
      ) || this.selection.start;

    const pos = beginning + icon.length;
    const newText = text.substr(0, start) + icon + text.substr(end);
    newPlainText = utils.getPlainText(
      newText,
      this.markup,
      this.displayTransform
    );
    this.updateText(newPlainText, newText, pos);
  }

  render() {
    const { charCounter, showEmojiPopup, text, touched } = this.state;
    const {
      maxTextLength,
      isEmail,
      enforceMaxTextLength,
      ...rest
    } = this.props;
    const {
      input,
      singleLine,
      placeholder,
      meta: { error }
    } = rest;

    return (
      <div className="MentionsTextInput">
        <OutsideClickHandler onOutsideClick={this.onOutsideEmojiBoxClick}>
          <EmojiMart
            setEmoji={this.insertEmoji}
            showEmojiPopup={showEmojiPopup}
          />
          <span
            onClick={this.handleEmojiPopup}
            onKeyUp={this.handleEmojiPopup}
            className="fa fa-smile-o errspan"
            style={
              isEmail
                ? {
                    position: "absolute",
                    bottom: "55px",
                    right: "-26px",
                    zIndex: 100
                  }
                : {
                    position: "absolute",
                    bottom: "108px",
                    right: "223px",
                    zIndex: 100
                  }
            }
            role="button"
            tabIndex={0}
          />
        </OutsideClickHandler>

        {maxTextLength && <span><b>Counter</b> : {charCounter}</span>}
        <MentionsInput
          //allowSpaceInQuery
          value={text}
          markup={this.markup}
          inputRef={this.mentionsRef}
          style={defaultStyle}
          singleLine={singleLine}
          placeholder={placeholder}
          onChange={this.handleChange}
          onSelect={this.handleSelection}
          displayTransform={this.displayTransform}
          onBlur={this.setTouched}
        >
          <Mention
            type="emojis"
            trigger=":"
            data={search => {
              const results = emojiIndex.search(search) || [];
              return results.map(e => ({
                id: `emoji-${e.id}`,
                display: e.native,
                name: e.name
              }));
            }}
            renderSuggestion={this.emojiRenderSuggestion}
          />
        </MentionsInput>
        {touched && error && <span style={errorSpan}>{error}</span>}
        {/*<Field
          name={input.name}
          render={({ input }) => (
            <div>
              <input type="hidden" {...input} />
            </div>
          )}
        />*/}
      </div>
    );
  }
}
