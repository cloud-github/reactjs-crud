import { store } from "../store";

export const fetch_macro_post = () => {
  return {
    type: "FETCH_MACRO_POST"
  };
};

export const receive_macro_post = post => {
  return {
    type: "FETCHED_MACRO_POST",
    data: post
  };
};

export const receive_macro_post_error = post => {
  return {
    type: "RECEIVE_MACRO_POST_ERROR",
    data: post
  };
};

export const getMacroData = () => {
  store.dispatch(fetch_macro_post());
  return function(dispatch /*getState*/) {
    return fetch(`https://rails-api-only.herokuapp.com/v1/macros`)
      .then(data => data.json())
      .then(data => {
        if (data.data && data.data.status >= 404) {
          dispatch(receive_macro_post_error(data.message));
        } else {
          dispatch(receive_macro_post(data.data));
        }
      });
    //.catch(err => dispatch(receive_macro_post_error()));
  };
};
