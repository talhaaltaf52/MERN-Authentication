import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Reuseables/Button";
import Input from "../../Reuseables/Input";
import auth from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import { dispatchLogin } from "../../Redux/Actions/AuthActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const LoginComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const { email, password } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.post("/user/login", {
        email: email,
        password: password,
      });
      toast.success(res.data.msg);
      localStorage.setItem("token", res.data.refresh_token);
      localStorage.setItem("firstLogin", true);
      dispatch({ type: "GET_TOKEN", payload: res.data.refresh_token });
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <SignUpDiv>
          <Heading>Login</Heading>
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
              <Input
                label="Password"
                type="password"
                value={password}
                name="password"
                handleChangeInput={handleChangeInput}
              />
            </div>

            <div>
              <Button
                name={
                  loading ? (
                    <>
                      <CircularProgress sx={{ color: "white" }} />
                    </>
                  ) : (
                    "Login"
                  )
                }
                type="submit"
              />
            </div>
          </form>
          <LinksDiv>
            <Link to="/signup" className="links">
              Don't have account? SignUp
            </Link>

            <Link to="/forgot-password" className="links">
              Forgot Password
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

export default LoginComp;
