export default {
  control: {
    backgroundColor: "#fff",

    fontSize: 18,
    fontWeight: "normal"
  },

  highlighter: {
    overflow: "hidden"
  },

  input: {
    margin: 0
  },

  "&singleLine": {
    control: {
      display: "inline-block",
      width: 330
    },

    highlighter: {
      padding: 1,
      border: "2px inset transparent"
    },

    input: {
      padding: 0,
      border: "2px inset"
    }
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      border: "1px solid silver"
    },

    highlighter: {
      padding: 3
    },

    input: {
      padding: 3,
      minHeight: 63,
      outline: 0,
      border: 0
    }
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14
    },

    item: {
      padding: "5px 15px",
      borderBottom: "0px solid rgba(0,0,0,0.15)",

      "&focused": {
        backgroundColor: "#cee4e5"
      }
    }
  }
};
