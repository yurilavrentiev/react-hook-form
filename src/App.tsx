import "./App.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Form } from "components/Form/Form";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFormOpen = () => {
    setIsModalOpen(true);
  };
  const handleFormClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Box
        sx={{
          backgroundColor: "lightGray",
          width: "100%",
          height: "700px",
          margin: "20px",
        }}
      >
        <Form open={isModalOpen} handleClose={handleFormClose}/>
        <Button
          sx={{margin: "10px"}}
          onClick={isModalOpen ? handleFormClose : handleFormOpen}
          variant={isModalOpen ? "outlined" : "contained"}
          color={isModalOpen ? "error" : "success"}
        >
          {isModalOpen ? "Hide Form" : "Show Form"}
        </Button>
      </Box>
    </div>
  );
}

export default App;
