import { TextField } from "@mui/material";
import React from "react";

const Input = ({
  label,
  type,
  value,
  name,
  handleChangeInput,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        type={type}
        style={{ width: "90%" }}
        value={value}
        name={name}
        onChange={handleChangeInput}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default Input;
