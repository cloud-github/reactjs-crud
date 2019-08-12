import React from "react";
import PropTypes from "prop-types";
import FroalaEditor from "react-froala-wysiwyg";

class Froala extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input } = this.props;
    input.onChange(e);
  }

  render() {
    const { input /*getMergeVariablesLikeName*/ } = this.props;

    /*let config = {      FOR REMOTE CALL
      at: "@",
      searchKey: "data_key",
      callbacks: {
        remoteFilter: function(query, callback) {
          getMergeVariablesLikeName(query).then(response => {
            callback(response.data);
          });
        }
      },
      displayTpl: "<li>${data_key}</li>",
      insertTpl: "{{${data_key}}}",
      limit: 6
    };*/

    this.config = {
      toolbarInline: false,
      toolbarButtons: [
        "bold",
        "italic",
        "emoticons",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "|",
        "fontFamily",
        "fontSize",
        "color",
        "inlineStyle",
        "paragraphStyle",
        "|",
        "paragraphFormat",
        "align",
        "formatOL",
        "formatUL",
        "outdent",
        "indent",
        "quote",
        "check",
        "|",
        "insertLink",
        "insertImage",
        "insertVideo",
        "embedly",
        "insertFile",
        "insertTable",
        "|",
        "emoticons",
        "specialCharacters",
        "insertHR",
        "selectAll",
        "clearFormatting",
        "|",
        "spellChecker",
        "help",
        "html",
        "|",
        "undo",
        "redo"
      ],
      emoticonsStep: 4,
      emoticonsSet: [
        {
          id: "people",
          name: "Smileys & People",
          code: "1f600",
          emoticons: [
            { code: "1f600", desc: "Grinning face" },
            { code: "1f601", desc: "Grinning face with smiling eyes" },
            { code: "1f602", desc: "Face with tears of joy" },
            { code: "1f603", desc: "Smiling face with open mouth" },
            {
              code: "1f604",
              desc: "Smiling face with open mouth and smiling eyes"
            },
            {
              code: "1f605",
              desc: "Smiling face with open mouth and cold sweat"
            },
            {
              code: "1f606",
              desc: "Smiling face with open mouth and tightly-closed eyes"
            },
            { code: "1f607", desc: "Smiling face with halo" }
          ]
        },
        {
          id: "nature",
          name: "Animals & Nature",
          code: "1F435",
          emoticons: [
            { code: "1F435", desc: "Monkey Face" },
            { code: "1F412", desc: "Monkey" },
            { code: "1F436", desc: "Dog Face" },
            { code: "1F415", desc: "Dog" },
            { code: "1F429", desc: "Poodle" },
            { code: "1F43A", desc: "Wolf Face" },
            { code: "1F431", desc: "Cat Face" },
            { code: "1F408", desc: "Cat" },
            { code: "1F42F", desc: "Tiger Face" },
            { code: "1F405", desc: "Tiger" },
            { code: "1F406", desc: "Leopard" },
            { code: "1F434", desc: "Horse Face" },
            { code: "1F40E", desc: "Horse" },
            { code: "1F42E", desc: "Cow Face" },
            { code: "1F402", desc: "Ox" },
            { code: "1F403", desc: "Water Buffalo" }
          ]
        }
      ],
      /*events: {
        "froalaEditor.contentChanged": function(e, editor) {
          editor.$el.atwho(config);
          editor.events.on(
            "keydown",
            function(e) {
              if (
                e.which === $.FroalaEditor.KEYCODE.ENTER &&
                editor.$el.atwho("isSelecting")
              ) {
                return false;
              }
            },
            true
          );
        }
      },*/
      charCounterCount: true
    };

    return (
      <div>
        <FroalaEditor
          name={input.name}
          model={input.value}
          config={this.config}
          onModelChange={this.onChange}
        />
      </div>
    );
  }
}

Froala.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired
};

export default Froala;
