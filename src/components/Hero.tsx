import React from "react";
import { Container, Card, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <Container>
      <Box sx={{ py: 5, display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            p: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#efebe9",
            width: "75%",
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            MERN Authentication
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the Material UI
            library
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
              sx={{ mr: 2 }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              to="/register"
              component={Link}
            >
              Sign Up
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Hero;
