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

  const Roles = () => {
    if (row.role === 1) {
      return <span>Super Admin</span>;
    }
    if (row.role === 0) {
      return <span>User</span>;
    }
    if (row.role === 2) {
      return <span>Admin</span>;
    }
    if (row.role === 3) {
      return <span>Moderator</span>;
    }
    if (row.role === 4) {
      return <span>Manager</span>;
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="left">
          <Roles />
        </TableCell>

        <TableCell align="left">
          {row.role === 1 ? (
            ""
          ) : (
            <>
              {" "}
              <DelBtn
                onClick={async () => {
                  try {
                    const res = await auth.delete(
                      `/user/delete-role/${row._id}`,
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
            </>
          )}
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
