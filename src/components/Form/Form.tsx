import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import dayjs from "dayjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Form.module.css";
import { ControlledTextField } from "components/ControlledMui/ControledTextField";
import { ControlledSelect } from "components/ControlledMui/ControlledSelect";
import { ControlledDatePicker } from "components/ControlledMui/ControlledDatePicker";
import { GENDER_OPTIONS, SOCIAL_MEDIA_OPTIONS } from "constants/constants";
import { DateOfBirthSchema, PasswordSchema, SocialMediaSchema } from "zod/validationSchemas";
import { isLoginUnique } from "helpers/helpers";

export type FormValues = {
  login: string;
  email: string;
  password: string;
  gender: string;
  birthDate: Date | null | string;
  socialMedia: { label: string; url: string }[];
};

export const Form = ({ open, handleClose, users, setUsers }: any) => {

  const ValidationSchema = z.object({
    login: z
      .string()
      .min(3, { message: "Login should be at least 3 digits" })
      .max(20, { message: "Login should be less then 20 digits" })
      .refine(login => isLoginUnique(login, users), {message: "User with this login already exist"}),
    email: z.string().email({message: "Shoul be valid email address"}),
    password: PasswordSchema,
    gender: z.string().min(1, {message: "Please select gender"}),
    birthDate: DateOfBirthSchema,
    socialMedia: SocialMediaSchema,
  });

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      login: "",
      email: "",
      password: "",
      gender: "",
      birthDate: null,
      socialMedia: [{ label: "", url: "" }],
    },
    resolver: zodResolver(ValidationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });
  
  const onSubmit = (data: any) => {

    const preparedData = {
      login: data.login,
      email: data.email,
      password: data.password,
      gender: data.gender,
      birthDate: dayjs(data.birthDate),
      socialMedia: [...data.socialMedia],
    };

    const updatedUsers = [...users, preparedData];

    setUsers(updatedUsers);
    reset();
    handleClose();
  };

  const onFormClose = () => {
    reset();
    handleClose();
  }

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={onFormClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={onFormClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" component="h4">
            Create New User
          </Typography>
          <Box className={styles.textField}>
            <ControlledTextField
              name={"login"}
              control={control}
              label={"Login"}
              fullWidth={true}
              size="small"
            />
          </Box>
          <Box className={styles.textField}>
            <ControlledTextField
              name="password"
              fullWidth={true}
              control={control}
              label="Password"
              size="small"
            />
          </Box>
          <Box className={styles.textField}>
            <ControlledTextField
              name="email"
              fullWidth={true}
              control={control}
              label="Email"
              size="small"
            />
          </Box>
          <Box className={styles.textField}>
            <ControlledSelect
              name="gender"
              label="Gender"
              size="small"
              control={control}
              fullWidth={true}
              options={GENDER_OPTIONS}
            />
          </Box>
          <Box className={styles.textField}>
            <ControlledDatePicker
              name="birthDate"
              label="Date of birth"
              control={control}
            />
          </Box>
          <h3>Social Media</h3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              alignItems: "center",
            }}
          >
            {fields.map((field, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <ControlledSelect
                    name={`socialMedia.${index}.label`}
                    control={control}
                    fullWidth={true}
                    label="Social media name"
                    size="small"
                    options={SOCIAL_MEDIA_OPTIONS}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      marginRight: index === 0 ? "50px" : 0,
                    }}
                  >
                    <ControlledTextField
                      name={`socialMedia.${index}.url`}
                      control={control}
                      fullWidth={true}
                      label="Url address"
                      size="small"
                    />
                  </Box>
                  {index > 0 && (
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              );
            })}
            <Button
              variant="outlined"
              size="small"
              onClick={() => append({ label: "", url: "" })}
              sx={{ maxWidth: "150px" }}
            >
              Add Social Media
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignSelf: "flex-end",
              justifySelf: "flex-end",
            }}
          >
            <Button variant="contained" type="submit" sx={{ margin: "10px" }}>
              Submit
            </Button>
            <Button
              sx={{ margin: "10px" }}
              variant="outlined"
              onClick={onFormClose}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
