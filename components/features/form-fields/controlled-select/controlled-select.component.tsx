import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

import { SelectProps as MuiSelectProps } from "@mui/material";
import { Select } from "@/components";

interface Option {
  label: string;
  value: string | number;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  emptyValue?: string | number;
  errorMessage?: string;
  options: Option[];
}

type SelectProps = Omit<MuiSelectProps, "id" | "value" | "onBlur" | "onChange" | "error" | "labelId">;

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  ...selectProps
}: Props<T> & SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <Select
          sx={{ backgroundColor: "light.100", borderRadius: 1 }}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...selectProps}
        />
      )}
    />
  );
}
