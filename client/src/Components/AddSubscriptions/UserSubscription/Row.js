import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../axios/axiosInstance";
import { useSelector } from "react-redux";

function Row(props) {
  const { row } = props;
  const { token } = useSelector((state) => state.TokenReducer);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.user.name}
        </TableCell>
        <TableCell align="left">{row.user.email}</TableCell>
        <TableCell align="left">{row.subscription.title}</TableCell>
        <TableCell align="left">{row.subscription.price}</TableCell>
        <TableCell align="left">
          

          <DelBtn
            onClick={async () => {
              try {
                const res = await auth.delete(
                  `/subscription/delete-user-subscription/${row._id}`,
                  {
                    headers: { Authorization: token },
                  }
                );
                toast.success(res.data.msg);
              } catch (e) {
                toast.error(e.response.data.msg);
              }
            }}
          >
            Delete
          </DelBtn>
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
}

const DelBtn = styled.button`
  background-color: red;
  color: white;
  text-transform: uppercase;
  padding: 4px 8px 4px 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;



export default Row;
