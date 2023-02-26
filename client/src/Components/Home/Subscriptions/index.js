import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchAllSubscriptions,
  fetchallSubscriptions,
  fetchallSubUsers,
  dispatchAllSubUsers,
} from "../../../Redux/Actions/SubscriptionActions";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
  const {token} = useSelector(state=>state.TokenReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    const getSubscriptions = async () => {
      return await fetchallSubscriptions().then((res) => {
        dispatch(dispatchAllSubscriptions(res));
      });
    };
    getSubscriptions();
  }, [dispatch]);

 
  const { subscriptions } = useSelector((state) => state.SubReducer);
  return (
    <>
      <Grid container spacing={{ sm: 3 }}>
        {subscriptions.map((val, index) => {
          return (
            <>
              <Grid item xs={12} sm={4} key={index}>
                <SubscriptionCard
                  title={val.title}
                  price={val.price}
                  description={val.description}
                  users={val.users}
                  id={val._id}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default Subscription;
