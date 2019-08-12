const createMacroCategory = value => () => {
  function onError(error) {
    return error;
  }
  try {
    console.log("DATA : ", value.name);
    return fetch(`http://localhost:3001/v1/macro_categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: value.name })
    })
      .then(data => data.json())
      .then(data => {
        console.log("RESPONSE: ", data);
        if (data.data && data.data.status >= 404) {
        } else {
          return data;
        }
      });
  } catch (error) {
    return onError(error);
  }
};

export default createMacroCategory;
