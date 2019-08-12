import { store } from "../store";

export const delete_macro_post = post => {
  return {
    type: "DELETE_MACRO",
    data: post
  };
};

export const delete_macro_post_error = post => {
  return {
    type: "DELETE_MACRO_POST_ERROR",
    data: post
  };
};

export const deleteMacro = ids => () => {
  function onError(error) {
    return error;
  }
  try {
    return fetch(`https://rails-api-only.herokuapp.com/v1/macros`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ids: ids })
    })
      .then(data => data.json())
      .then(data => {
        if (data.data && data.data.status >= 404) {
          store.dispatch(delete_macro_post_error(data.message));
        } else {
          data.response.forEach(function(data) {
            store.dispatch(delete_macro_post(data));
          });
        }
      });
  } catch (error) {
    return onError(error);
  }
};
