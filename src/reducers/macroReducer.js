const initialState = {
  userData: {},
  isFetching: false,
  isError: false
};

const macroReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MACRO_POST":
      return Object.assign({}, state, {
        isFetching: true,
        userData: {},
        isError: false
      });
    case "FETCHED_MACRO_POST":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: false
      });
    case "RECEIVE_MACRO_POST_ERROR":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: true
      });
    default:
      return state;
  }
};

export default macroReducer;
