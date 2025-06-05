import * as React from 'react'
import { Controller, Control, Path, FieldValues } from 'react-hook-form'

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  SwitchProps as MuiSwitchProps,
  FormGroup
} from '@mui/material'

interface Props<T extends FieldValues> {
  label: string
  switchLabel: string
  name: Path<T>
  control: Control<T>
  errorMessage?: string
  customOnChange?: () => void
}

type SwitchProps = Omit<MuiSwitchProps, 'value' | 'onBlur' | 'onChange'>

export function ControlledSwitch<T extends FieldValues>({
  label,
  switchLabel,
  name,
  control,
  errorMessage,
  customOnChange,
  ...switchProps
}: Props<T> & SwitchProps) {
  return (
    <FormControl fullWidth>
      <FormHelperText sx={{ ml: 0 }}>{label}</FormHelperText>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <FormGroup row>
            <FormControlLabel
              label={switchLabel}
              control={
                <Switch
                  checked={value}
                  onChange={(_, checked) => {
                    if (typeof customOnChange === 'function') customOnChange()
                    onChange(checked)
                  }}
                  onBlur={onBlur}
                  {...switchProps}
                />
              }
            />
          </FormGroup>
        )}
      />
      {errorMessage && <FormHelperText sx={{ color: 'error.main' }}>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}