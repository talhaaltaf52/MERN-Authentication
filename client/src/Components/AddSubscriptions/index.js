import React, { useEffect } from "react";
import AddSubscriptionsComp from "./AddSubscriptions";
import UserSubscription from "./UserSubscription";
import { useSelector, useDispatch } from "react-redux";
import {
  dispatchAllSubUsers,
  fetchallSubUsers,
} from "../../Redux/Actions/SubscriptionActions";

const AddSubscriptions = () => {
  const { users } = useSelector((state) => state.SubReducer);
  const { token } = useSelector((state) => state.TokenReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUsersSubscriptions = async () => {
      return await fetchallSubUsers(token).then((res) => {
        dispatch(dispatchAllSubUsers(res));
      });
    };
    getUsersSubscriptions();
  }, [token, dispatch]);

  return (
    <>
      <AddSubscriptionsComp />
      {users.length === 0 ? (
        <h2
          style={{
            color: "blueviolet",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          You have no subscribers yet...
        </h2>
      ) : (
        <UserSubscription />
      )}
    </>
  );
};

export default AddSubscriptions;
