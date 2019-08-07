import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import macroReducer from "./macroReducer";
import aboutMeReducer from "./aboutMeReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    macro_post: macroReducer,
    aboutme_post: aboutMeReducer
  });
