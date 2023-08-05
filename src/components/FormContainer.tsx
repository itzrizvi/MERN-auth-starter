import React, { ReactNode } from "react";
import { Container, Card, Box } from "@mui/material";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
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
          {children}
        </Card>
      </Box>
    </Container>
  );
};

export default FormContainer;
