import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userToDelete: string;
  deleteUser: (login: string) => void;
}

export const ConfirmDialog = ({
  open,
  setOpen,
  deleteUser,
  userToDelete,
}: ConfirmDialogProps) => {
  const customDialogStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ style: customDialogStyle }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
          backdropFilter: "blur(5px)",
        },
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm alert</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure, you want to delete user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            deleteUser(userToDelete);
            setOpen(false);
          }}
        >
          Confirm
        </Button>
        <Button variant="outlined" onClick={handleDialogClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
