import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import macroReducer from "./macroReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    macro_post: macroReducer
  });
