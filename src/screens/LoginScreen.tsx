import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";
import { UserPayload } from "../utils/types";
import { toast } from "react-toastify";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const res: UserPayload = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged in successfully!!");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
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
            {!isLoading ? (
              <Button
                variant="contained"
                type="submit"
                endIcon={<Login />}
                style={{ marginBottom: "15px" }}
              >
                Login
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
            New here? <Link to="/register">Register</Link>
          </Grid>
        </Grid>
      </Box>
    </FormContainer>
  );
};

export default LoginScreen;
