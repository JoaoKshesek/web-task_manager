"use client";
import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: theme.spacing(6),
}));

export const Loading = styled(CircularProgress)<CircularProgressProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const Description = styled(Typography)<TypographyProps>(() => ({}));
