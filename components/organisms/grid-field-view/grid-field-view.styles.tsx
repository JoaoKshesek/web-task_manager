"use client";
import * as React from "react";

import {
  Box,
  BoxProps,
  Chip,
  ChipProps,
  Grid,
  GridProps,
  Link,
  LinkProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";

export const Container = styled((props) => <Grid container spacing={5} {...props} />)<GridProps>(() => ({}));

export const Item = styled((props) => <Grid {...props} />)<GridProps>(() => ({}));

export const FieldName = styled((props) => <Typography variant="subtitle2" {...props} />)<TypographyProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  })
);

export const FieldValue = styled((props) => <Typography variant="body2" {...props} />)<TypographyProps>(() => ({}));

export const FieldChip = styled((props: ChipProps) => <Chip {...props} />)<ChipProps>(({ theme, color = "default" }) => {
  const paletteColor = theme.palette[color as keyof typeof theme.palette];

  return {
    borderRadius: 2,
    border: "1px solid",
    borderColor: paletteColor.main || undefined,
    color: paletteColor.main,
    backgroundColor: paletteColor.light,
    fontWeight: 500,
    fontSize: ".75rem",
  };
});


export const VerticalList = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const HorizontalList = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
}));

export const FieldLink = styled((props) => (
  <Link variant="body2" underline="hover" target="_blank" {...props} />
))<LinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: "pointer",
}));
