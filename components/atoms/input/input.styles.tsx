"use client"
import * as React from 'react'
import { styled } from '@mui/material/styles'

import TextFieldComponent, { TextFieldProps } from '@mui/material/TextField'

export const TextField = styled(({ sx, ...props }: TextFieldProps) => (
  <TextFieldComponent
    sx={{
      '& .MuiInputBase-root > svg': {
        mr: 2
      },
      ...sx
    }}
    {...props}
  />
))<TextFieldProps>(() => ({}))
