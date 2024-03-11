import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Control, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { FormValues } from "components/Form/Form";
import styles from './styles.module.css'
import { FormControl, FormHelperText } from "@mui/material";



interface ControlledDatePickerProps {
  name: any;
  label: string;
  control: Control<FormValues, any, FormValues>
}

export const ControlledDatePicker = ( { name, label, control }: ControlledDatePickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: {onChange, value}, fieldState: { error }}) => {
        console.log("error", error)
       return (<LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl fullWidth error={Boolean(error)}>
          <DatePicker label={label} value={value ? dayjs(value).toString() : null} onChange={(value) => onChange(dayjs(value).toISOString())} className={styles.datePicker} />
          {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        </LocalizationProvider>
  )}}
    />
  );
};
