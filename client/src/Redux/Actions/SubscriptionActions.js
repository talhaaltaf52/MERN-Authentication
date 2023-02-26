import ACTIONS from "./index";
import auth from "../../axios/axiosInstance";

export const fetchallSubscriptions = async () => {
  const res = await auth.get("/subscription/get-subscription");
  return res;
};

export const dispatchAllSubscriptions = (res) => {
  return {
    type: ACTIONS.GET_SUBSCRIPTIONS,
    payload: res.data,
  };
};

export const fetchallSubUsers = async (token) => {
  const res = await auth.get("/subscription/get-user-subscriptions", {
    headers: {
      Authorization: token,
    },
  });

  return res;
};

export const dispatchAllSubUsers = (res) => {
  return {
    type: ACTIONS.GET_SUBS_USERS,
    payload: res.data,
  };
};
