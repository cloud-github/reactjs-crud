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

    case "ADD_NEW_MACRO":
      return Object.assign({}, state, {
        userData: [...state.userData, action.data],
        isFetching: false,
        isError: false
      });

    case "UPDATE_MACRO":
      return Object.assign({}, state, {
        userData: state.userData.map(item => {
          return item.id === action.data.id ? action.data : item;
        })
      });

    case "UPDATE_MACRO_POST_ERROR":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: true
      });

    case "DELETE_MACRO": {
      return Object.assign({}, state, {
        userData: [
          ...state.userData.filter(
            item => item.id !== JSON.stringify(action.data.id)
          )
        ]
      });
    }

    case "DELETE_MACRO_POST_ERROR":
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
