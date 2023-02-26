import React, { useState } from "react";
import { isLength, isEmpty } from "./validations";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Reuseables/Button";
import Input from "../../Reuseables/Input";
import auth from "../../axios/axiosInstance";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const handleChangeInput = (e) => {
    let value = e.target.value;
    setPassword(value);
  };
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLength(password)) {
      toast.error("Password must be at least 6 characters long");
    }
    if (isEmpty(password)) {
      toast.error("Please enter new password");
    }
    try {
      const res = await auth.post(
        "/user/reset-password",
        { password: password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <Container>
        <SignUpDiv>
          <Heading>Reset Password</Heading>
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                label="New Password"
                type="password"
                value={password}
                name="password"
                handleChangeInput={handleChangeInput}
              />
            </div>
            <div>
              <Button name="Reset Password" type="submit" />
            </div>
          </form>
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

export default ResetPassword;
