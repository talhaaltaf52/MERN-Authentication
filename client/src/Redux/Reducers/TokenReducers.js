import ACTIONS from "../Actions";

const initialState = {
  token: "",
};

const TokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_TOKEN:
      return {
        token: action.payload,
      };
    case ACTIONS.REMOVE_TOKEN:
      return {
        token: "",
      };
    default:
      return {
        token: localStorage.getItem("token")
          ? localStorage.getItem("token")
          : "",
      };
  }
};

export default TokenReducer;
