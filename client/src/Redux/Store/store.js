import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducers";
import TokenReducer from "../Reducers/TokenReducers";
import UsersReducer from "../Reducers/UsersReducers";
import RoleReducer from '../Reducers/RoleReducers'
import SubReducer from '../Reducers/SubReducers'

const store = configureStore({
  reducer: {
    AuthReducer,
    TokenReducer,
    UsersReducer,
    RoleReducer,
    SubReducer
  },
});

export default store;
