import ACTIONS from "./index";
import auth from "../../axios/axiosInstance";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchUser = async (token) => {
  const res = await auth.get("/user/profile", {
    headers: { Authorization: token },
  });
  console.log(res.data);
  return res;
};

export const dispatchGetUser = (res) => {
  return {
    type: ACTIONS.GET_USER,
    payload: {
      user: res.data,
      isSuperAdmin: res.data.role === 1 ? true : false,
      isAdmin: res.data.role === 2 ? true : false,
      isModerator: res.data.role === 3 ? true : false,
      isManager: res.data.role === 4 ? true : false,
    },
  };
};
