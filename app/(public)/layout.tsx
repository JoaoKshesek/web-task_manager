"use client";

import { ReactNode } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Button } from "@/components";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          height: "100vh",
          width: "70vw",
          bgcolor: "background.purple",
          backgroundImage: `
            linear-gradient(to right, #240046 1px, transparent 1px),
            linear-gradient(to bottom, #240046 1px, transparent 1px)
        `,
          backgroundSize: "16px 16px",
          zIndex: -1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 16,
          gap: 4,
        }}
      ></Box>

      <Box
        component="aside"
        sx={{
          bgcolor: "background.default",
          height: "100vh",
          width: "30vw",
          padding: 4,
          paddingTop: 20,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
