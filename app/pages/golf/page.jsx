'use client';

import React, { useState } from "react";
import TextArea from "../../components/TextArea";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

export default function GolfPage() {
  const [textValue, setTextValue] = useState("");
  const [name, setName] = useState("Mike Ore");
  const [time, setTime] = useState("12:00"); // Currently unused
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error messages
  const [success, setSuccess] = useState(false); // To manage success messages

  const handleSubmit = async () => {
    // Construct the current date-time in ISO format
    const dateTime = new Date().toISOString();

    // Prepare the payload
    const payload = {
      name,
      date: dateTime,
      text: textValue,
    };

    console.log("Submitting:", payload); // Optional: Log the payload

    // Set loading state
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/golfforum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful response
        console.log("Success:", data);
        setSuccess(true);
        setTextValue(""); // Clear the text area
      } else {
        // Handle errors returned from the server
        console.error("Error:", data.error);
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      // Handle network or unexpected errors
      console.error("Unexpected Error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setTextValue(event.target.value); // Update the state as the user types
  };

  const handleNameChange = (event) => {
    setName(event.target.value); // Update the name as the user types
  };

  // Handlers for Snackbar notifications
  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="flex w-full flex-col justify-center p-4">
      <div className="flex w-full mb-4 text-2xl font-bold">Golf Forum</div>

      {/* Optional: Name Input Field */}
      <div className="mb-4">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
      </div>

      {/* Text Area for Forum Post */}
      <div className="mb-4">
        <TextArea 
          fullWidth={true} 
          multiline={true} 
          rows={4}
          value={textValue} // Bind the state to the TextArea
          onChange={handleChange} // Handle input change
          placeholder="Enter your forum post here..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          variant="contained"
          className="mt-4"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Forum post created successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
