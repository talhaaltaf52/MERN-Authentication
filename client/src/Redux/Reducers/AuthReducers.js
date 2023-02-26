import ACTIONS from "../Actions";

const initialState = {
  user: {},
  isLogged: false,
  isSuperAdmin: false,
  isAdmin: false,
  isModerator: false,
  isManager: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isSuperAdmin: action.payload.isSuperAdmin,
        isAdmin: action.payload.isAdmin,
        isModerator: action.payload.isModerator,
        isManager: action.payload.isManager,
      };
    default:
      return state;
  }
};

export default AuthReducer;
