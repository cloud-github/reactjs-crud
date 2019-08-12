export const getMacroCategoryName = query => async () => {
  function onSuccess(response) {
    return response;
  }

  function onError(error) {
    return error;
  }

  try {
    const query_val = { query: query, type: "get_name" };
    return fetch(
      `https://rails-api-only.herokuapp.com/v1/macro_categories?query=${query_val.query}&type=${query_val.type}`
    )
      .then(data => data.json())
      .then(data => {
        return onSuccess(data);
        /*if (data.data && data.data.status >= 404) {
          dispatch(receive_macro_post_error(data.message));
        } else {
          dispatch(receive_macro_post(data));
        }*/
      });
  } catch (error) {
    return onError(error);
  }
};
