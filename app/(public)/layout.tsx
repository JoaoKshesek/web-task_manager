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
      >
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ display: "flex", justifyContent: "center", gap: 4, padding: 4, background: "#240046" }}>
            <Typography
              sx={{ color: "#fff", textAlign: "center", fontSize: 24, fontWeight: 700, textTransform: "uppercase" }}
            >
              Frontend
            </Typography>
          </CardContent>
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, paddingInline: 8, paddingTop: 4 }}>
            <Button variant="contained" icon="mdi:github" label="Github" sx={{ background: "#171515", height: 48 }} />
            <Button variant="contained" icon="mdi:github" label="Hospedagem" sx={{ height: 48 }} />
          </CardContent>
        </Card>

        <Card sx={{ width: 400 }}>
          <CardContent sx={{ display: "flex", justifyContent: "center", gap: 4, padding: 4, background: "#240046" }}>
            <Typography
              sx={{ color: "#fff", textAlign: "center", fontSize: 24, fontWeight: 700, textTransform: "uppercase" }}
            >
              Backend
            </Typography>
          </CardContent>
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, paddingInline: 8, paddingTop: 4 }}>
            <Button variant="contained" icon="mdi:github" label="Github" sx={{ background: "#171515", height: 48 }} />
            <Button variant="contained" icon="mdi:github" label="Hospedagem" sx={{ height: 48 }} />
          </CardContent>
        </Card>
      </Box>

      <Box
        component="aside"
        sx={{
          bgcolor: "background.default",
          height: "100vh",
          width: "30vw",
          padding: 4,
          paddingTop: 16,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
