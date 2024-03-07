import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Control, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { FormValues } from "components/Form/Form";
import styles from './styles.module.css'

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
      render={({ field: {onChange, value}}) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={label} value={value ? value : null} onChange={onChange} className={styles.datePicker}/>
        </LocalizationProvider>
      )}
    />
  );
};
