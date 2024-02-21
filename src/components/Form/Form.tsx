import { Box, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
import styles from "./Form.module.css";


export const Form = ({open, handleClose}: any) => {
  return (
    <Modal
      sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.container}>
      
      <form className={styles.form}>
      <IconButton
          sx={{position: "absolute", top: 0, right: 0}}
          onClick={handleClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
        <Typography variant="h6" component="h4">Super Hero Constructor</Typography>
        <TextField size="small" fullWidth label="Super Hero Name"/>
       
      </form>
      </Box>
    </Modal>
  );
};
