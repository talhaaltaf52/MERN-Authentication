import React, { useState } from "react";
import { useParams,  Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../Reuseables/Button";
import Input from "../../../Reuseables/Input";
import { CircularProgress, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import auth from "../../../axios/axiosInstance";

const EditComp = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.TokenReducer);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [users, setUsers] = useState(0);
  const { state } = useLocation();

  const update = () => {
    setLoading(true);
    auth
      .patch(
        `/subscription/update-subscription/${id}`,
        { price: price, users: users },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.response.data.msg);
        setLoading(false);
      });
  };

  return (
    <>
      <Container>
        <SignUpDiv>
          <Heading>Update Subscription</Heading>

          <div>
            <Input
              label="Title"
              type="text"
              defaultValue={state.title}
              name="name"
              disabled="true"
            />
          </div>
          <div>
            <Input
              label="Price"
              type="number"
              name="price"
              value={price}
              handleChangeInput={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Users"
              type="number"
              name="users"
              value={users}
              handleChangeInput={(e) => setUsers(e.target.value)}
            />
          </div>
          <div>
            <Button
              onClick={update}
              name={
                loading ? (
                  <>
                    <CircularProgress sx={{ color: "white" }} />
                  </>
                ) : (
                  "Update"
                )
              }
              type="submit"
            />
          </div>

          <LinksDiv>
            <Link to="/subscriptions" className="links">
              Back
            </Link>
          </LinksDiv>
        </SignUpDiv>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blueviolet;
  height: 90.4vh;
  @media screen and (max-width: 768px) {
    height: 91.6vh;
  }
`;

const Heading = styled.h3`
  color: blueviolet;
`;

const SignUpDiv = styled.div`
  padding: 15px;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  width: 400px;
  div {
    margin-top: 5px;
  }
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;

const LinksDiv = styled.div`
  .links {
    display: block;
    color: blueviolet;
  }
`;

const SelectDiv = styled.div`
  .select_field {
    width: 90%;
  }
  .label {
    text-align: left;
    margin-left: 5%;
    font-weight: bold;
    color: black;
    font-size: 14px;
  }
`;

export default EditComp;
