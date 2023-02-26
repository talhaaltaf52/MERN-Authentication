import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../Reuseables/Button";
import Input from "../../Reuseables/Input";
import { isEmail, isEmpty } from "./validations";
import auth from "../../axios/axiosInstance";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const handleChangeInput = (e) => {
    let value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      toast.error("Invalid email format");
    }
    if (isEmpty(email)) {
      toast.error("Please enter your email");
    }
    try {
      const res = await auth.post("/user/forgot-password", { email: email });
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <Container>
        <SignUpDiv>
          <Heading>Forgot Password</Heading>
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                label="Email"
                type="email"
                value={email}
                name="email"
                handleChangeInput={handleChangeInput}
              />
            </div>
            <div>
              <Button name="Send Mail" type="submit" />
            </div>
          </form>
          <LinksDiv>
            <Link to="/login" className="links">
              Login
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

export default Forgot;
