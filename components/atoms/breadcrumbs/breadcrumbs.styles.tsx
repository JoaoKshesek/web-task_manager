"use client";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const Container = styled("nav")(() => ({
  display: "flex",
  alignItems: "center",
}));

export const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 12,
  color: theme.palette.text.secondary,
}));

export const Button = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 500,
  transition: 'all ease-in 150ms',

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(16),
}));
