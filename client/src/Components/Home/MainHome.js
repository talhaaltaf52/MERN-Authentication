import React from "react";
import styled from "styled-components";
import useAdmin from "../../CustomHooks/useAdmin";
import Subscription from "./Subscriptions";

const MainHome = () => {
  const { isSuperAdmin, isAdmin } = useAdmin();

  return (
    <>
      <Container>{isAdmin || isSuperAdmin ? "" : <Subscription />}</Container>
    </>
  );
};

const Container = styled.div`
  padding: 20px;
`;

export default MainHome;
