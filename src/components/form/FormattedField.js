import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

import {
  IconButton,
  TextField,
} from "@mui/material";
export default function FormattedField({ label, name, placeholder, length }) {
  const [formattedValue, setFormattedValue] = useState("");
  const [value, setValue] = useState(false);
  const [showValue, setShowValue] = useState(false);

  const handleInputChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    // Ensure mobile number has exactly 10 digits
    inputValue = inputValue.slice(0, length);
    const formatted = formatInput(inputValue);
    setFormattedValue(formatted);
    setValue(formatted);
  };

  const formatInput = (value) => {
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length <= 9) {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 9)}`;
    } else {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
        6,
        9
      )}-${value.slice(9, length)}`;
    }
  };
  const toggleVisibility = () => {
    setShowValue(!showValue);
  };
  const handleBlur = () => {
    let masked = "";
    if (name === "ssn") {
      const lastChars = formattedValue.slice(-3);
      masked = `xxx-xxx-${lastChars}`;
    } else if (name === "mobileNumber") {
      const lastChars = formattedValue.slice(0, 3);
      masked = `${lastChars}-xxx-xxx`;
    }
    setFormattedValue(masked);
  };

  return (
    <div className="form-group">
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id={name}
        name={name}
        value={showValue ? value : formattedValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: (
            <IconButton onClick={toggleVisibility} edge="end">
              {showValue ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
