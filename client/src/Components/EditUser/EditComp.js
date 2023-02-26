import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../Reuseables/Button";
import Input from "../../Reuseables/Input";
import { CircularProgress, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import auth from "../../axios/axiosInstance";

const EditComp = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.TokenReducer);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { roles } = useSelector((state) => state.RoleReducer);

  const [value, setValue] = useState();
  const handleChange = (e) => {
    let value = e.target.value;
    setValue(value);
  };

  const Roles = ({ role }) => {
    if (role === 1) {
      return <span>Super Admin</span>;
    }
    if (role === 0) {
      return <span>User</span>;
    }
    if (role === 2) {
      return <span>Admin</span>;
    }
    if (role === 3) {
      return <span>Moderator</span>;
    }
    if (role === 4) {
      return <span>Manager</span>;
    }
  };

  const updateRole = () => {
    setLoading(true);
    auth
      .patch(
        `/user/update-user-role/${id}`,
        { role: value },
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
          <Heading>Update User</Heading>

          <div>
            <Input
              label="Name"
              type="name"
              defaultValue={state.name}
              name="name"
              disabled="true"
            />
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              disabled="true"
              defaultValue={state.email}
            />
          </div>
          <SelectDiv>
            <InputLabel
              className="label"
              id="demo-simple-select-standard-label"
            >
              New Role
            </InputLabel>
            <Select
              className="select_field"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              onChange={(e) => handleChange(e)}
            >
              {roles.map((val, index) => {
                return (
                  <MenuItem key={index} value={val.role}>
                    <Roles role={val.role} />
                  </MenuItem>
                );
              })}
            </Select>
          </SelectDiv>

          <div>
            <Button
              onClick={updateRole}
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
            <Link to="/profile" className="links">
              Back to Profile
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
