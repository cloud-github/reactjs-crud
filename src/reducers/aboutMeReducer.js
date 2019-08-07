const initialState = {
  userData: {},
  isFetching: false,
  isError: false
};

const aboutMereducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ABOUTME_POST":
      return Object.assign({}, state, {
        isFetching: true,
        userData: {},
        isError: false
      });
    case "FETCHED_ABOUTME_POST":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: false
      });
    case "RECEIVE_ABOUTME_POST_ERROR":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: true
      });
    default:
      return state;
  }
};

export default aboutMereducer;
