import ACTIONS from "../Actions";

const initialState = {
  users: [],
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_USERS:
      return {
        users: action.payload,
      };
    default:
      return state;
  }
};

export default UsersReducer;
