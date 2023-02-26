import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import auth from "../../axios/axiosInstance";

const Activate = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [succ, setSucc] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await auth.post("/user/verify-email", {
            activation_token: activation_token,
          });
          toast.success(res.data.msg);
          setSucc(res.data.msg);
        } catch (error) {
          toast.error(error.response.data.msg);
          setErr(error.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <>
      <Container>
        <SignUpDiv>
          <Heading>
              
            {succ ? succ : ""}
          </Heading>
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

export default Activate;
