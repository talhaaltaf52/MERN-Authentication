import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import auth from "../../../axios/axiosInstance";

const SubscriptionCard = ({ title, price, description, users, id }) => {
  const { user } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.TokenReducer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const BuySubscription = async () => {
    setLoading(true);
    await auth
      .post(
        "subscription/add-user",
        {
          email: user.email,
          id: id,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        toast.success(`${res.data.msg}. Please login Again`);
        setLoading(false);
        localStorage.clear();
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <>
      <Card sx={{ width: "100%", textAlign: "center" }}>
        <CardContent>
          <Heading>{title}</Heading>
          <Price>${price}</Price>
          <Description>{description}</Description>
          <Users>Maximum users allowed to create: {users}</Users>
          <AddBtn onClick={BuySubscription}>
            {loading ? "Buying...." : "Buy Now"}
          </AddBtn>
        </CardContent>
      </Card>
    </>
  );
};

const Heading = styled.h1`
  color: black;
  text-transform: uppercase;
  padding-top: 20px;
  padding-bottom: 20px;
  letter-spacing: 7px;
`;
const Price = styled.h2`
  color: green;
  font-size: 28px;
  text-transform: uppercase;
  padding-bottom: 20px;
`;

const Description = styled.p`
  padding-bottom: 20px;
`;

const AddBtn = styled.button`
  color: white;
  background-color: green;
  width: 100%;
  border: none;
  padding: 10px 0 10px 0;
  border-radius: 5px;
`;

const Users = styled.p`
  color: blueviolet;
  padding-bottom: 20px;
`;

export default SubscriptionCard;
