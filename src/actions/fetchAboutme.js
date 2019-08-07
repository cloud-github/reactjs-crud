import { store } from "../store";

export const fetch_aboutme_post = () => {
  return {
    type: "FETCH_ABOUTME_POST"
  };
};

export const receive_aboutme_post = post => {
  return {
    type: "FETCHED_ABOUTME_POST",
    data: post
  };
};

export const receive_aboutme_post_error = post => {
  return {
    type: "RECEIVE_ABOUTME_POST_ERROR",
    data: post
  };
};

export const getAboutMeData = () => {
  store.dispatch(fetch_aboutme_post());
  return function(dispatch /* ,getState*/) {
    return fetch(`http://www.maheshjoshi.me/madmin/wp-json/wp/v2/aboutme/`)
      .then(data => data.json())
      .then(data => {
        if (data.data && data.data.status >= 404) {
          dispatch(receive_aboutme_post_error(data.message));
        } else {
          dispatch(receive_aboutme_post(data));
        }
      });
    // .catch(err => dispatch(receive_intro_post_error()));
  };
};
