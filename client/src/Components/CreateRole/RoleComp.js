import { CircularProgress, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import auth from "../../axios/axiosInstance";
import Button from "../../Reuseables/Button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "./RoleTable/index";
import {
  fetchAllRoles,
  dispatchAllRoles,
} from "../../Redux/Actions/RoleActions";

const RoleComp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.TokenReducer);
  const { isSuperAdmin } = useSelector((state) => state.AuthReducer);
  const [value, setValue] = useState();
  const handleChange = (e) => {
    let value = e.target.value;
    setValue(value);
  };

  useEffect(() => {
    if (isSuperAdmin) {
      const getAllRoles = async () => {
        return await fetchAllRoles(token).then((res) => {
          dispatch(dispatchAllRoles(res));
        });
      };
      getAllRoles();
    }
  }, [token, isSuperAdmin, dispatch]);

  const updateRole = () => {
    setLoading(true);
    auth
      .post(
        "/user/create-role",
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
        <Left>
          <Heading>Create Role</Heading>

          <SelectDiv>
            <Select
              className="select_field"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value={2}>Admin</MenuItem>
              <MenuItem value={3}>Moderator</MenuItem>
              <MenuItem value={4}>Manager</MenuItem>
              <MenuItem value={0}>User</MenuItem>
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
                  "Create"
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
`;

export default RoleComp;
