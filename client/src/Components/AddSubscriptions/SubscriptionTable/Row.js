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
          {row.title}
        </TableCell>
        <TableCell align="left">{row.price}</TableCell>
        <TableCell align="left">{row.users}</TableCell>
        <TableCell align="left">
          <EditBtn
            onClick={() =>
              navigate(`/edit-subscription/${row._id}`, {
                state: { price: row.price, users: row.users, title: row.title },
              })
            }
          >
            Edit
          </EditBtn>

          <DelBtn
            onClick={async () => {
              try {
                const res = await auth.delete(
                  `/subscription/delete-subscription/${row._id}`,
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

const EditBtn = styled.button`
  background-color: green;
  color: white;
  text-transform: uppercase;
  padding: 4px 8px 4px 8px;
  border: none;
  border-radius: 3px;
  margin-right: 6px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

export default Row;
