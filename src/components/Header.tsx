import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Login,
  PersonAdd,
  AccountCircle,
  Logout,
  MoreVert,
} from "@mui/icons-material";
import { RootState } from "../store";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      setAnchorEl(null);
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      toast.info("Logged out!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <header>
      <AppBar position="static" style={{ backgroundColor: "#222222" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            MERN Auth
          </Typography>
          {userInfo ? (
            <>
              <Button color="warning" onClick={handleMenuOpen}>
                {userInfo.name}
                <MoreVert />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: { padding: "6px", marginTop: "5px" },
                }}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/profile"
                >
                  <AccountCircle style={{ marginRight: "10px" }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <Logout style={{ marginRight: "10px" }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                variant="outlined"
                component={Link}
                to="/login"
                style={{ marginRight: "10px" }}
                endIcon={<Login />}
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                component={Link}
                to="/register"
                endIcon={<PersonAdd />}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
