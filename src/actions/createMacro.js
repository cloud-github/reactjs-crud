import { store } from "../store";

export const add_macro_post = post => {
  return {
    type: "ADD_NEW_MACRO",
    data: post
  };
};

export const receive_macro_post_error = post => {
  return {
    type: "RECEIVE_MACRO_POST_ERROR",
    data: post
  };
};

const createMacro = values => () => {
  function onError(error) {
    return error;
  }
  try {
    const data = new FormData();
    data.append("macro[name]", values.name);
    data.append("macro[macro_type]", values.type);
    data.append("macro[subject]", values.subject.text);
    data.append("macro[macro_category_id]", values.macroCategoryId);
    data.append("macro[body]", values.type === "email" ? values.body : "");
    return fetch(`https://rails-api-only.herokuapp.com/v1/macros`, {
      method: "POST",
      body: data
    })
      .then(data => data.json())
      .then(data => {
        if (data.data && data.data.status >= 404) {
          store.dispatch(receive_macro_post_error(data.message));
        } else {
          store.dispatch(add_macro_post(data.data));
          return data.data;
        }
      });
  } catch (error) {
    return onError(error);
  }
};

export default createMacro;
