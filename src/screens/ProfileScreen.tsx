import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Edit } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { RootState } from "../store";
import { UpdateResponse } from "../utils/types";

const ProfileScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo?.name || "");
    setEmail(userInfo?.email || "");
  }, [userInfo]);

  const submitHandler = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("Password did not matched!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      try {
        const res: UpdateResponse = await updateProfile({
          name,
          email,
          password: confirmPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
        Update Profile
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
              value={name}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              id="outlined-basic-pass"
              label="Change Password"
              variant="outlined"
              name="password"
              type="password"
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            {!isLoading ? (
              <Button
                variant="contained"
                type="submit"
                endIcon={<Edit />}
                style={{ marginBottom: "15px" }}
              >
                Update Profile
              </Button>
            ) : (
              <Box sx={{ display: "flex", marginBottom: "15px" }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </FormContainer>
  );
};

export default ProfileScreen;
