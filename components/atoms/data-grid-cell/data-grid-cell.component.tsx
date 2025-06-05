import React, { useMemo } from "react";

import { Chip, ChipProps, Link, SxProps, Theme, Tooltip, Typography, useTheme } from "@mui/material";

type Variant = "default" | "chip";

interface Props {
  variant?: Variant;
  value?: string | null;
  withTooltip?: boolean;
  href?: string;
  emptyMessage?: string;
  chipColor?: ChipProps["color"];
}

export function DataGridCell({
  value,
  href,
  chipColor,
  variant = "default",
  withTooltip = false,
  emptyMessage = "-",
}: Props) {
  const theme = useTheme();

  const childrenComponent = useMemo(() => {
    const styledCellComponent: SxProps<Theme> = {
      color: href && value ? theme.palette.primary.main : theme.palette.text.primary,
      verticalAlign: "middle",
      display: "flex",
      alignItems: "center",
      height: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    };

    if (!value) {
      return (
        <Typography variant="body2" sx={styledCellComponent}>
          {emptyMessage}
        </Typography>
      );
    }

    switch (variant) {
      case "chip":
        return (
          <Chip
            color={chipColor}
            label={value}
            sx={{
              borderRadius: 1,
              border: "1px solid",
              borderColor: theme.palette[chipColor]?.main || undefined,
              color: theme.palette[chipColor]?.main,
              backgroundColor: theme.palette[chipColor]?.light,
              fontWeight: 500,
            }}
          />
        );
      default:
        return href ? (
          <Link variant="body2" underline="hover" target="_blank" href={href} sx={styledCellComponent}>
            {value}
          </Link>
        ) : (
          <Typography variant="body2" sx={styledCellComponent}>
            {value}
          </Typography>
        );
    }
  }, [chipColor, variant, href, value, emptyMessage, theme]);

  return withTooltip ? <Tooltip title={value}>{childrenComponent}</Tooltip> : childrenComponent;
}
