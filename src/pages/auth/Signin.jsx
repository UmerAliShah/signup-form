import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

export default function Signin() {
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password is too short, minimum 8 characters required")
      .max(50, "Password is too long, maximum 50 characters allowed")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    recaptcha: Yup.string().required("reCAPTCHA verification is required"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("work");
  };
  return (
    <Container component="main" maxWidth="sm" className="my-5">
      <Typography
        className="text-center font-weight-bold"
        component="h1"
        variant="h4"
      >
        Sign in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div
                      style={{
                        backgroundColor: "#FFEBEF",
                        padding: "7px",
                        fontSize: "12px",
                      }}
                    >
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <div
                      style={{
                        backgroundColor: "#FFEBEF",
                        padding: "7px",
                        fontSize: "12px",
                      }}
                    >
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <p style={{ textDecoration: "underline" }}>
                  Need help Signing In?
                </p>
              </div>
              {/* <div className="form-group w-100 d-flex justify-content-center align-items-center my-5">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  onChange={(value) => {
                    values.recaptcha = value;
                  }}
                />
                <ErrorMessage
                  name="recaptcha"
                  component="div"
                  className="error-message"
                />
              </div> */}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="rounded-pill"
                style={{
                  border: "5px solid #ffe7ec",
                }}
                sx={{
                  backgroundColor: "#e70033",
                  paddingY: 1.5,
                  "&:hover": {
                    backgroundColor: "#80001C",
                  },
                }}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <div className="form-group d-flex justify-content-center mt-5 mb-2">
          Don’t have a myEquifax account?
          <Link
            to="/"
            style={{ color: "black" }}
            className="ps-2 font-weight-bold"
          >
            Register Now
          </Link>
        </div>
        <div className="form-group  d-flex justify-content-center">
          <p style={{ textDecoration: "underline" }}>Privacy Notice</p>
        </div>
        <div className="form-group  d-flex justify-content-center">
          <p>
            For help or support, contact the Customer Care team at 1-888-EQUIFAX
            (1-888-378-4329). Customer Care is available between 9:00 AM and
            9:00 PM ET, Mon-Fri; 9:00 AM and 6:00 PM ET, Sat-Sun.
          </p>
        </div>
        <div className="form-group  d-flex justify-content-center">
          <img
            src={require("../../assets/Sectigo_trust_seal_thumbnail.jpg")}
            className="img-fluid w-25"
          />
        </div>
      </Box>
    </Container>
  );
}
