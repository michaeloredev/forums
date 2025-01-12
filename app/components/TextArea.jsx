import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextInput(props) {
  const { 
    fullWidth, 
    multiline,
    rows,
    width,
    onChange,
  } = props;

  const resolvedWidth = fullWidth ? "100%" : width;

  return (
    <div>
      <TextField
        multiline={multiline}
        rows={rows}
        onChange={onChange}
        sx={{
          width: resolvedWidth
        }}
      />
    </div>
  );
}
