import { CircularProgress, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Reuseables/Button";
import Table from "./SubscriptionTable/index";
import Input from "../../Reuseables/Input";
import auth from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddSubscriptionsComp = () => {
  const { token } = useSelector((state) => state.TokenReducer);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [users, setUsers] = useState();
  const handleChangeInput = (e) => {
    setPrice(e.target.value);
  };
  const [value, setValue] = useState();
  const handleChange = (e) => {
    let value = e.target.value;
    setValue(value);
  };

  const Add = () => {
    setLoading(true);
    auth
      .post(
        "/subscription/add-subscription",
        { title: value, price: price, description: desc, users: users },
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
        <Left>
          <Heading>Create Subscription</Heading>

          <SelectDiv>
            <Select
              className="select_field"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Platinum">Platinum</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
            </Select>
          </SelectDiv>
          <Field>
            <Input
              label="Price"
              type="number"
              value={price}
              handleChangeInput={(e) => setPrice(e.target.value)}
            />
          </Field>
          <Field>
            <Input
              label="Description"
              type="text"
              value={desc}
              handleChangeInput={(e) => setDesc(e.target.value)}
            />
          </Field>
          <Field>
            <Input
              label="Users"
              type="number"
              value={users}
              handleChangeInput={(e) => setUsers(e.target.value)}
            />
          </Field>

          <div>
            <Button
              onClick={Add}
              name={
                loading ? (
                  <>
                    <CircularProgress sx={{ color: "white" }} />
                  </>
                ) : (
                  "Create"
                )
              }
              type="submit"
            />
          </div>
        </Left>
        <Right>
          <Table />
        </Right>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;

  @media screen and (max-width: 768px) {
    height: 91.6vh;
    flex-direction: column;
  }
`;

const Heading = styled.h3`
  color: blueviolet;
`;

const Left = styled.div`
  width: 30%;
  padding: 20px;
  border-right: 1px solid gray;
  @media screen and (max-width: 768px) {
    border-bottom: 1px solid gray;
    border-right: none;
    width: 100%;
  }
`;
const Right = styled.div`
  width: 70%;
  @media screen and (max-width: 768px) {
   
    width: 100%;
  }
`;

const SelectDiv = styled.div`
  .select_field {
    width: 90%;
  }
`;

const Field = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
export default AddSubscriptionsComp;
