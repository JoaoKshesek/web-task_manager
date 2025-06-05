"use client";
import React, { useState } from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Icon } from "@/components";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
}

type InputProps = Omit<OutlinedInputProps, "id" | "value" | "onBlur" | "onChange" | "error" | "type" | "endAdornment">;

export function ControlledPasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  ...inputProps
}: Props<T> & InputProps) {
  const id = `controlled-field-${name}`;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id} error={Boolean(errorMessage)}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <OutlinedInput
            sx={{ borderRadius: 1 }}
            id={id}
            label={label}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={Boolean(errorMessage)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} fontSize={20} />
                </IconButton>
              </InputAdornment>
            }
            {...inputProps}
          />
        )}
      />
      {errorMessage && <FormHelperText sx={{ color: "error.main" }}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
