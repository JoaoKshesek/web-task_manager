import * as React from "react";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  emptyValue?: string | number;
  shrink?: boolean;
  errorMessage?: string;
  options: Option[];
}

type SelectProps = Omit<MuiSelectProps, "id" | "labelId">;

export function Select({
  name,
  label,
  options,
  errorMessage,
  size,
  shrink = true,
  emptyValue = "",
  ...selectProps
}: Props & SelectProps) {
  const id = `controlled-select-${name}`;
  const labelId = `controlled-select-${name}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId} shrink={shrink}>
        {label}
      </InputLabel>

      <MuiSelect
        id={id}
        sx={{ backgroundColor: "light.100", borderRadius: 1 }}
        label={label}
        labelId={labelId}
        error={Boolean(errorMessage)}
        size={size}
        {...selectProps}
      >
        <MenuItem value={emptyValue}>
          <em>Selecione uma opção</em>
        </MenuItem>
        {options.map(({ label, value }, index) => {
          return (
            <MenuItem key={index.toString()} value={value}>
              {value === "" ? <em>{label}</em> : label}
            </MenuItem>
          );
        })}
      </MuiSelect>

      {errorMessage && <FormHelperText sx={{ color: "error.main" }}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
