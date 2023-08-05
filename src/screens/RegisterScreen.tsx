import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Login, PersonAdd } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submitHandler = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Box
        component="form"
        sx={{ width: "100%" }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => submitHandler(e)}
      >
        <Grid container rowSpacing={1}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="outlined-basic-email"
              label="Enter Your Name"
              variant="outlined"
              name="name"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic-email"
              label="Enter Your Email"
              variant="outlined"
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic-pass"
              label="Set Your Password"
              variant="outlined"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic-pass-confirm"
              label="Confirm Your Password"
              variant="outlined"
              name="password"
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            <Button
              variant="contained"
              type="submit"
              endIcon={<PersonAdd />}
              style={{ marginBottom: "15px" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "100%" }} component="div">
        <Grid container rowSpacing={1}>
          <Grid item xs={12} md={6}>
            Already have an account? <Link to="/login">Login</Link>
          </Grid>
        </Grid>
      </Box>
    </FormContainer>
  );
};

export default RegisterScreen;
