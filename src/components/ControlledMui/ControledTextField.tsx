import { FormHelperText, TextField } from "@mui/material";
import { FormValues } from "components/Form/Form";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface ControledTextFieldProps {
  name: any;
  label: string;
  control: Control<FormValues, any, FormValues>;
  fullWidth: boolean;
  size: "small" | "medium";
}

export const ControlledTextField = ({
  name,
  control,
  label,
  fullWidth,
  size,
}: ControledTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth={fullWidth}
          size={size}
          error={Boolean(error)}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};
