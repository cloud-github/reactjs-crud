import { store } from "../store";

export const update_macro_post = post => {
  return {
    type: "UPDATE_MACRO",
    data: post
  };
};

export const update_macro_post_error = post => {
  return {
    type: "UPDATE_MACRO_POST_ERROR",
    data: post
  };
};

const updateMacro = (id, values) => () => {
  function onError(error) {
    return error;
  }
  try {
    const data = new FormData();
    data.append("macro[name]", values.name);
    data.append("macro[macro_type]", values.type);
    data.append("macro[subject]", values.subject.rawText);
    data.append("macro[macro_category_id]", values.macroCategoryId);
    data.append("macro[body]", values.type === "email" ? values.body : "");
    return fetch(`https://rails-api-only.herokuapp.com/v1/macros/${id}`, {
      method: "PUT",
      body: data
    })
      .then(data => data.json())
      .then(data => {
        if (data.data && data.data.status >= 404) {
          store.dispatch(update_macro_post_error(data.message));
        } else {
          store.dispatch(update_macro_post(data.data[0]));
          return data.data;
        }
      });
  } catch (error) {
    return onError(error);
  }
};

export default updateMacro;
