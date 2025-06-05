"use client";

import { ReactNode } from "react";
import { Box, Drawer, Typography } from "@mui/material";
import { Sidebar } from "@/components";
import { Footer } from "@/components";
import Image from "next/image";

const drawerWidth = 240;

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#10002b",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: "12px" }}>
          <Image priority src="/assets/logos/logo.svg" width={40} height={40} alt="Logo" />
          <Typography variant="h6">Task Manager</Typography>
        </Box>
        <Box sx={{ overflow: "auto", p: 2 }}>
          <Sidebar />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          bgcolor: "background.default",
          minHeight: "94vh",
          width: '100%'
        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  );
}
