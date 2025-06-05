"use client"
import { Box, BoxProps, styled } from '@mui/material'

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  paddingInline: theme.spacing(4),
  paddingTop: theme.spacing(4),

}))
