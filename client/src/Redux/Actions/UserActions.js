import ACTIONS from "./index";
import auth from "../../axios/axiosInstance";

export const fetchAllUsers = async (token) => {
  const res = await auth.get("/user/all-profiles", {
    headers: { Authorization: token },
  });
  return res;
  
};

export const dispatchAllUsers = (res) => {
  return {
    type: ACTIONS.GET_ALL_USERS,
    payload: res.data,
  };
};
