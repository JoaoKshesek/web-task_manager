import { FormControl, FormHelperText, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
}

type InputProps = Omit<TextFieldProps, "value" | "onBlur" | "onChange" | "error">;

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
}: Props<T> & InputProps) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            label={label}
            value={field.value !== null ? dayjs(field.value) : null}
            onChange={(value) => field.onChange(value ? dayjs(value?.format("YYYY-MM-DD")) : null)}
          />
        )}
      />
      {errorMessage && <FormHelperText sx={{ color: "error.main" }}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
