"use client";

import { ReactNode, useState } from "react";
import { Box, Drawer, Typography, IconButton, useMediaQuery, Toolbar, AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar } from "@/components";
import { Footer } from "@/components";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseMobileMenu = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: "12px" }}>
        <Image priority src="/assets/logos/logo.svg" width={40} height={40} alt="Logo" />
        <Typography variant="h6">Task Manager</Typography>
      </Box>
      <Box sx={{ overflow: "auto", p: 2 }}>
        <Sidebar onItemClick={handleCloseMobileMenu} />
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: "#10002b" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Task Manager
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {!isMobile && (
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
          open
        >
          {drawerContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              backgroundColor: "#10002b",
              color: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          bgcolor: "background.default",
          minHeight: "94vh",
          width: "100%",
          p: 3,
          marginTop: isMobile ? "52px" : 0,
        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  );
}
