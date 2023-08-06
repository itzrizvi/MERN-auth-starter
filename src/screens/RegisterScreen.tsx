import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { PersonAdd } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";
import { RegsterResponse } from "../utils/types";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password did not matched!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      try {
        const res: RegsterResponse = await register({
          name,
          email,
          password: confirmPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Registered successfully!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        navigate("/");
      } catch (error: any) {
        toast.error(error?.data?.message || error.error, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  return (
    <FormContainer>
      <Typography
        variant="h3"
        component="h4"
        fontSize={40}
        fontWeight={700}
        mb={5}
      >
        Sign Up
      </Typography>
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
              id="outlined-basic-name"
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
            {!isLoading ? (
              <Button
                variant="contained"
                type="submit"
                endIcon={<PersonAdd />}
                style={{ marginBottom: "15px" }}
              >
                Register
              </Button>
            ) : (
              <Box sx={{ display: "flex", marginBottom: "15px" }}>
                <CircularProgress />
              </Box>
            )}
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
