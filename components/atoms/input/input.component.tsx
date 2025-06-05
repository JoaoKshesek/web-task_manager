import * as React from 'react'

import { TextFieldProps } from '@mui/material'

import { TextField } from './input.styles'

export function Input(props: TextFieldProps) {
  return <TextField {...props} />
}
