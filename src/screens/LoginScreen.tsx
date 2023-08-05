import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
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
              label="Enter Your Password"
              variant="outlined"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            <Button
              variant="contained"
              type="submit"
              endIcon={<Login />}
              style={{ marginBottom: "15px" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "100%" }} component="div">
        <Grid container rowSpacing={1}>
          <Grid item xs={12} md={6}>
            New here? <Link to="/register">Register</Link>
          </Grid>
        </Grid>
      </Box>
    </FormContainer>
  );
};

export default LoginScreen;
