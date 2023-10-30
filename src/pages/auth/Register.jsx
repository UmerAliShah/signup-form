import React, { useState } from "react";

import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Typography,
  StylesProvider,
  Container,
  IconButton,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

let initialValues = {
  firstName: "",
  lastName: "",
  dob: "",
  ssn: "",
  mobile: "",
};

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Register() {
  const [formattedValue, setFormattedValue] = useState("");

  const handleInputChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    // Ensure the input length is not greater than the desired length
    inputValue = inputValue.slice(0, 10);
    const formatted = formatInput(inputValue);
    setFormattedValue(formatted);
  };

  const formatInput = (value) => {
    if (value.length <= 2) {
      return value;
    } else if (value.length <= 4) {
      return `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
      return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
    }
  };
  const options = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];
  return (
    <Box className="">
      <FormikStepper
        initialValues={initialValues}
        onSubmit={async (values) => {
          await sleep(3000);
          console.log("values", values);
        }}
      >
        <FormikStep
          label="Register"
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            dob: Yup.date().required("Date of Birth is required"),
            ssn: Yup.string()
              .matches(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format")
              .required("SSN is required"),
            mobile: Yup.string()
              .matches(/^\d{3}-\d{3}-\d{4}$/, "Invalid mobile format")
              .required("Mobile is required"),
          })}
        >
          <Typography variant="h5" color="initial" className="py-3">
            Personal Information
          </Typography>
          <Box className="pt-3 px-5 d-flex justify-content-between">
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="firstname">First Name:</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="firstname"
                name="firstname"
                autoComplete="firstname"
                autoFocus
              />
              <ErrorMessage name="firstname">
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
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="ssn">SSn or ITIN (xxx-xxx-xxx):</label>
              <FormattedField name="ssn" placeholder="xxx-xxx-xxx" length={9} />
              <ErrorMessage name="ssn">
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
              <p style={{ fontSize: 12 }}>
                Your Social Security number helps us locate your credit report
                and verify your identity.
              </p>
            </div>
          </Box>
          <Box className=" px-5 d-flex justify-content-between">
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="lastname">Last Name:</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="lastname"
                name="lastname"
                autoComplete="lastname"
                autoFocus
              />
              <ErrorMessage name="lastname">
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
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="ssn">Mobile Number (xxx-xxx-xxxx):</label>
              <FormattedField
                name="mobileNumber"
                placeholder="xxx-xxx-xxxx"
                length={10}
              />
              <ErrorMessage name="ssn">
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
              <p style={{ fontSize: 12 }}>
                We may text you to verify your identity and to provide
                service-related alerts. Message and data rates may apply. If you
                do not have a mobile number, use your home phone number.
              </p>
            </div>
          </Box>
          <Box className=" px-5 d-flex justify-content-between">
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="lastname">Date of birth(MM/DD/YYYY)</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="lastname"
                name="lastname"
                value={formattedValue}
                placeholder="__/__/____"
                onChange={handleInputChange}
                // onBlur={handleBlur}
              />
              <ErrorMessage name="lastname">
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
          </Box>
          <hr />
          <Typography variant="h5" color="initial" className="py-3">
            Current Address
          </Typography>
          <Box className=" px-5 d-flex justify-content-between">
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="address_1">Address Line 1</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="address_1"
                name="address_1"
                autoComplete="address_1"
                autoFocus
              />
              <ErrorMessage name="address_1">
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
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="city">City</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="city"
                name="city"
                autoComplete="city"
                autoFocus
              />
              <ErrorMessage name="city">
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
          </Box>
          <Box className=" px-5 d-flex justify-content-between">
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="address_2">Address Line 2</label>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="address_2"
                name="address_2"
                autoComplete="address_2"
                autoFocus
              />
              <ErrorMessage name="address_2">
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
            <div
              className="form-group d-flex justify-content-between align-items-center"
              style={{ width: "45%" }}
            >
              <div className="form-group" style={{ width: "45%" }}>
                <label className="mb-2" htmlFor="state">
                  State
                </label>
                <Field
                  as={Select}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="state"
                  name="state"
                  value="Select State"
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="state">
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
              <div className="form-group" style={{ width: "45%" }}>
                <label htmlFor="zip">ZIP code</label>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="zip"
                  name="zip"
                  autoComplete="zip"
                  autoFocus
                />
                <ErrorMessage name="zip">
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
            </div>
          </Box>
        </FormikStep>
        <FormikStep label="Bank Info">
          <Box paddingBottom={2}>
            <Field
              fullWidth
              type="number"
              name="money"
              component={TextField}
              label="All the money I have"
            />
          </Box>
        </FormikStep>
        <FormikStep label="More Info">
          <Box paddingBottom={2}>
            <Field
              fullWidth
              name="description"
              component={TextField}
              label="Description"
            />
          </Box>
        </FormikStep>
      </FormikStepper>
    </Box>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          values.money = 200;
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
      enableReinitialize={true}
    >
      {({ resetForm, isSubmitting }) => (
        <Form autoComplete="off">
          <Box sx={{ backgroundColor: "#F7F9FA" }} className="p-5">
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box className="text-center mt-3">
              <Typography variant="h4" color="initial">
                Let's get started
              </Typography>
              <Typography variant="p" color="initial">
                We'll need some of your information first. Already have an
                account? <Link to="/signin">Sign in here</Link>
              </Typography>
            </Box>
          </Box>
          <Container>
            {currentChild}
            {/* <div className="form-group w-100 d-flex justify-content-center align-items-center my-5">
              <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
            </div> */}
            <Grid
              container
              spacing={2}
              className="justify-content-center w-100"
            >
              <Grid item>
                {step > 0 ? (
                  <Button
                    onClick={() => setStep((s) => s - 1)}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                ) : null}
              </Grid>
              <Grid item>
                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  className="rounded-pill"
                  style={{
                    border: "5px solid #ffe7ec",
                  }}
                  sx={{
                    backgroundColor: "#e70033",
                    paddingY: 1.5,
                    paddingX: 20,
                    "&:hover": {
                      backgroundColor: "#80001C",
                    },
                  }}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting
                    ? "Submitting"
                    : isLastStep()
                    ? " Submit"
                    : "Continue"}
                </Button>
              </Grid>
            </Grid>
            <div className="form-group  d-flex justify-content-center">
              <img
                src={require("../../assets/Sectigo_trust_seal_thumbnail.jpg")}
                className="img-fluid w-25"
              />
            </div>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export function FormattedField({ label, name, placeholder, length }) {
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
