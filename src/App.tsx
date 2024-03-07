import "./App.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Form } from "components/Form/Form";
import { ConfirmDialog } from "components/Dialog/ConfirmDialog";
import { User, UserCard } from "components/UserCard/UserCard";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserTodelete] = useState("");

  const handleFormOpen = () => {
    setIsModalOpen(true);
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = (login: string) => {
    const filteredUsers = users.filter((user: User) => user.login !== login);
    setUsers(filteredUsers);
  };

  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lightGray",
          width: "100%",
          height: "700px",
          margin: "20px",
        }}
      >
        {users.length !== 0
          ? users.map((user: User) => {
              return (
                <UserCard
                  user={user}
                  setUserTodelete={setUserTodelete}
                  setDialogOpen={setDialogOpen}
                />
              );
            })
          : null}
        <Form
          open={isModalOpen}
          handleClose={handleFormClose}
          users={users}
          setUsers={setUsers}
        />
        <Button
          sx={{ margin: "10px" }}
          onClick={isModalOpen ? handleFormClose : handleFormOpen}
          variant={isModalOpen ? "outlined" : "contained"}
          color={isModalOpen ? "error" : "success"}
        >
          Add User
        </Button>
        <ConfirmDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          deleteUser={handleDeleteUser}
          userToDelete={userToDelete}
        />
      </Box>
    </div>
  );
}

export default App;
