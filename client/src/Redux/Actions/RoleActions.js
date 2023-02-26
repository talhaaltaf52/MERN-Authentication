import ACTIONS from "./index";
import auth from "../../axios/axiosInstance";

export const fetchAllRoles = async (token) => {
  const res = await auth.get("/user/get-roles", {
    headers: { Authorization: token },
  });
  return res;
  
};

export const dispatchAllRoles = (res) => {
  return {
    type: ACTIONS.GET_ROLES,
    payload: res.data,
  };
};
