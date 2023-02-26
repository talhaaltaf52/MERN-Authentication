import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Reuseables/Button";
import Input from "../../Reuseables/Input";
import { useNavigate } from "react-router-dom";
import auth from "../../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isEmail, isEmpty, isLength, isMatch } from "./validations";

const SignupComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [user, setUser] = useState(initialState);
  const { email, password, name, cf_password } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEmpty(name) || isEmpty(password)) {
      toast.error("Please fill all fields");
    }
    if (isEmail(email)) {
      toast.error("Email format is invalid");
    }
    if (isLength(password)) {
      toast.error("Password must be atleast 6 characters long");
    }
    if (!isMatch(password, cf_password)) {
      toast.error("Password did not match");
    }
    try {
      const res = await auth.post("/user/register", {
        name: name,
        email: email,
        password: password,
      });
      console.log(res.data.msg)
      toast.success(res.data.msg)
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <Container>
        <SignUpDiv>
          <Heading>SignUp</Heading>
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                label="Name"
                type="text"
                handleChangeInput={handleChangeInput}
                name="name"
                value={name}
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                handleChangeInput={handleChangeInput}
                name="email"
                value={email}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                handleChangeInput={handleChangeInput}
                name="password"
                value={password}
              />
            </div>
            <div>
              <Input
                label="Confirm Password"
                type="password"
                handleChangeInput={handleChangeInput}
                name="cf_password"
                value={cf_password}
              />
            </div>
           
            <div>
              <Button name="Signup" type="submit" />
            </div>
          </form>
          <Link to="/login">Already have account? Login</Link>
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

export default SignupComp;
