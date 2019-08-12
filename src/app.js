import React from "react";
import "./assets/styles/style.css";
import "../node_modules/froala-editor/css/froala_editor.css";
import "../node_modules/froala-editor/css/froala_editor.pkgd.min.css";
import "../node_modules/emoji-mart/css/emoji-mart.css";

//import logo from "./assets/images/logo.svg";
import Routes from "./routes";

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
