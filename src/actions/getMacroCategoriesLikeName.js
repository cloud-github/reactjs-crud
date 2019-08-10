const getMacroCategoriesLikeName = query => async () => {
  function onSuccess(response) {
    return response.data;
  }

  function onError(error) {
    return error;
  }

  try {
    return fetch(`http://localhost:3001/v1/macro_categories`, {
      params: { query: query, type: "like_name" }
    })
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

export default getMacroCategoriesLikeName;
