import ACTIONS from "../Actions";

const initialState = {
  roles: [],
};

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ROLES:
      return {
        roles: action.payload,
      };
    default:
      return state;
  }
};

export default RoleReducer;
