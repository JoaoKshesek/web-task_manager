"use client";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(32),
  fontWeight: 600,
  color: theme.palette.dark[200],
}));
