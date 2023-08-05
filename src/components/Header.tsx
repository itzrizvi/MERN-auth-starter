import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  //   Menu,
  //   MenuItem,
} from "@mui/material";
import { Login, PersonAdd } from "@mui/icons-material";

const Header: React.FC = () => {
  //   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  //   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleMenuClose = () => {
  //     setAnchorEl(null);
  //   };

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
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
