"use client"
import * as React from 'react'

import { Box, BoxProps, styled } from '@mui/material'

import { Alignment } from './input-icon.component'

interface ContainerProps extends BoxProps {
  alignment: Alignment
}

export const Container = styled(({ alignment, ...props }: ContainerProps) => (
  <Box sx={alignment === 'left' ? { mr: 2 } : { ml: 2 }} {...props} />
))<BoxProps>(() => ({
  display: 'flex'
}))
