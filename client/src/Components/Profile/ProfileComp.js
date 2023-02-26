import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dispatchGetUser, fetchUser } from "../../Redux/Actions/AuthActions";
import Input from "../../Reuseables/Input";
import Button from "../../Reuseables/Button";
import { toast } from "react-toastify";
import auth from "../../axios/axiosInstance";
import { isLength, isMatch } from "./validations";
import Table from "./UsersTable/index";
import {
  fetchAllUsers,
  dispatchAllUsers,
} from "../../Redux/Actions/UserActions";

const ProfileComp = () => {
  const { token } = useSelector((state) => state.TokenReducer);
  const { user, isSuperAdmin } = useSelector((state) => state.AuthReducer);

  const initialState = { name: "", password: "", cf_password: "" };
  const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, password, cf_password } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        return await fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (isSuperAdmin) {
      const getAllUsers = async () => {
        return await fetchAllUsers(token).then((res) => {
          dispatch(dispatchAllUsers(res));
        });
      };
      getAllUsers();
    }
  }, [token, isSuperAdmin, dispatch]);

  const changeAvatar = async (e) => {
    // e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) {
        toast.error("No file was uploaded");
      }
      if (file.size > 1024 * 1024) {
        toast.error("File is too large");
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        toast.error("Invalid file format");
      }
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await auth.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setAvatar(res.data.url);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const UpdateInfo = () => {
    if (isLength(password)) {
      toast.error("Password must be at least 6 characters long!");
    }
    if (!isMatch(password, cf_password)) {
      toast.error("Password did not match!");
    }
    try {
      auth.patch(
        "/user/update-profile",
        {
          name: name ? name : user.user.name,
          avatar: avatar ? avatar : user.user.avatar,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Update Successfully");
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };

  const UpdatePassword = () => {
    if (isLength(password)) {
      toast.error("Password must be at least 6 characters long!");
    }
    if (!isMatch(password, cf_password)) {
      toast.error("Password did not match!");
    }
    try {
      auth.post(
        "/user/reset-password",
        {
          password: password,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Update Successfully");
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };

  const handleUpdate = () => {
    if (name || avatar) UpdateInfo();
    if (password) UpdatePassword();
  };

  return (
    <>
      <Container>
        <Left>
          <ImgDiv>
            <img src={user.avatar} alt={user.name} />
          </ImgDiv>
          <form>
            <label className="file_label" htmlFor="file_up">
              {loading ? "Uploading..." : "Change"}
            </label>
            <input
              className="file_input"
              type="file"
              id="file_up"
              name="file"
              onChange={(e) => changeAvatar(e)}
            />
          </form>
          <div>
            <Input
              label="Name"
              type="text"
              handleChangeInput={handleChangeInput}
              name="name"
              defaultValue={user.name}
            />
          </div>
          <div>
            <Input
              disabled={true}
              type="email"
              handleChangeInput={handleChangeInput}
              name="email"
              value={user.email}
            />
          </div>
          <div>
            <Input
              label="New Password"
              type="password"
              handleChangeInput={handleChangeInput}
              name="password"
              value={password}
            />
          </div>
          <div>
            <Input
              label="Confirm New Password"
              type="password"
              handleChangeInput={handleChangeInput}
              name="cf_password"
              value={cf_password}
            />
          </div>
          <div>
            <Button
              type="submit"
              name="Update Profile"
              onClick={handleUpdate}
            />
          </div>
        </Left>
        <Right>
          {isSuperAdmin ? <Table /> : "**Only admin can see users detail**"}
        </Right>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  border-right: 1px solid #deddd9;
  text-align: center;
  width: 400px;
  div {
    margin-top: 10px;
  }
  .file_label {
    text-decoration: underline;
    color: blueviolet;
    cursor: pointer;
  }
  .file_label:hover {
    text-decoration: none;
  }
  .file_input {
    display: none;
  }
  @media screen and (max-width: 768px) {
    width: 95%;
    border-right: none;
    border-bottom: 1px solid #deddd9;
    padding-bottom: 20px;
  }
`;
const Right = styled.div``;
const ImgDiv = styled.div`
  img {
    width: 100px;
    border-radius: 50%;
  }
`;

export default ProfileComp;
