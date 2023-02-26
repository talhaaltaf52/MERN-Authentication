import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./Row";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import { FaSearch } from "react-icons/fa";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector } from "react-redux";

export default function CollapsibleTable() {
  const { users } = useSelector((state) => state.SubReducer);
  const [rows, setRows] = React.useState(users);

  const [search, setSearch] = React.useState("");
  const [emailErr, setEmailErr] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [emailOpen, setEmailOpen] = React.useState(false);

  // Modal closing function
  const handleClose = () => {
    setOpen(false);
  };
  const handleEmailClose = () => {
    setEmailOpen(false);
  };

  // get searched data function
  const searchingData = (e) => {
    let valid = searchValidate();
    if (valid) {
      if (e.key == "Enter") {
        const filterRows = users.filter((row) => {
          return row.user.email.toLowerCase().includes(search.toLowerCase());
        });
        setRows(filterRows);
      }
    } else {
      if (e.key == "Enter") {
        setEmailOpen(true);
      }
    }
  };

  // searching validations
  const searchValidate = () => {
    let emailErr = {};
    let valid = true;
    if (search === "") {
      emailErr.emptyEmail = "Please enter email";
      valid = false;
    }
    setEmailErr(emailErr);
    return valid;
  };

  // reset hadler
  const resetDataHandler = (e) => {
    if (e.target.value === "") {
      setRows(users);
    }
  };

  // pagination hooks and functions
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ fontWeight: "bold" }} id="alert-dialog-title">
          Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {Object.keys(emailErr).map((key, index) => {
              return (
                <div key={index}>
                  <ErrorMessage> {emailErr[key]}</ErrorMessage>
                </div>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={emailOpen}
        onClose={handleEmailClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ fontWeight: "bold" }} id="alert-dialog-title">
          Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {Object.keys(emailErr).map((key, index) => {
              return (
                <div key={index}>
                  <ErrorMessage> {emailErr[key]}</ErrorMessage>
                </div>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <FilterSection>
        <div className="search_input_container">
          <TextField
            type="text"
            placeholder="Search by email or name"
            className="search_input"
            value={search}
            name={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetDataHandler(e);
            }}
            onKeyPress={(e) => searchingData(e)}
            focused
            color="grey"
            size="small"
            label="Name / Email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </FilterSection>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Heading>Name</Heading>
              </TableCell>
              <TableCell align="left">
                <Heading>Email</Heading>
              </TableCell>
              <TableCell align="left">
                <Heading>Subscription</Heading>
              </TableCell>
              <TableCell align="left">
                <Heading>Price</Heading>
              </TableCell>
              <TableCell align="left">
                <Heading>Actions</Heading>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row._id} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

const Heading = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 3px 5px 3px 5px;
  margin-bottom: 5px;
  .search_input_container {
    background-color: white;
    /* border: 1px solid #737373; */
    border-radius: 3px;
    margin-top: 6px;
    .search_input {
      width: 500px;
      border: none;
    }
    .search_input:focus {
      outline: none;
      border: none;
    }
  }
  .date_input_container {
    background-color: white;
    /* border: 1px solid grey; */
    border-radius: 3px;
    margin-top: 6px;
    width: 270px;
    .date_input {
      width: 270px;
      border: none;
    }
    .date_input:focus {
      outline: none;
      border: none;
    }
  }
  .income_btn {
    background-color: #2a04c2;
    padding: 0 5px 0 5px;
    border: 1px solid grey;
    border-radius: 3px;
    width: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .income {
      color: white;
      text-transform: uppercase;
    }
  }
  .income_btn1 {
    background-color: green;
    padding: 0 5px 0 5px;
    border: 1px solid grey;
    border-radius: 3px;
    width: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .income1 {
      color: white;
      text-transform: uppercase;
    }
  }
  .hide {
    display: none;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    .search_input_container {
      margin-bottom: 6px;
    }
    .income_btn {
      width: 100%;
      margin-bottom: 2px;
      padding: 7px 0 7px 0;
    }
    .income_btn1 {
      width: 100%;
      margin-bottom: 2px;
      padding: 7px 0 7px 0;
    }
    .date_input_container {
      width: 100%;
      margin-bottom: 6px;
    }
    .date_input {
      width: 100% !important;
    }
    .search_input {
      width: 100% !important;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;
