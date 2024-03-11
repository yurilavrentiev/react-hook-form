import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { FormValues } from "components/Form/Form";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface ControlledSelectProps {
  name: any;
  label: string;
  size: "small" | "medium";
  control: Control<FormValues, any, FormValues>;
  fullWidth: boolean;
  options: Option[];
}

type Option = {
  id: string;
  label: string;
}

export const ControlledSelect = ({ name, control, label, options, size, fullWidth }: ControlledSelectProps) => {
  return (
    <Controller 
      name={name}
      control={control}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
      <FormControl fullWidth={fullWidth} error={Boolean(error)}>
      <InputLabel id="gender-label">{label}</InputLabel>
      <Select 
            labelId="gender-label" 
            size={size as "small" | "medium"} 
            label={label as string} 
            value={value as string} 
            onChange={onChange} 
            onBlur={onBlur}
          >
            {options.map(option => (
              <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem> 
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
    )}/>
  );
};
