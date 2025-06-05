"use client"
import * as React from 'react'

import { IconButton, IconButtonProps, styled } from '@mui/material'

export const Button = styled((props: IconButtonProps) => <IconButton size='small' {...props} />)<IconButtonProps>(
  () => ({})
)
