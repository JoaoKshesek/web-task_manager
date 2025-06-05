"use client";

import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components";
import { useAuthentication } from "@/_libs";

export const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useAuthentication({ middleware: "auth" });

  const navSections = [
    {
      sectionTitle: "Aplicação",
      items: [
        { icon: "material-symbols:dashboard-rounded", label: "Dashboard", href: "/dashboard" },
        { icon: "mdi:clipboard-text-clock", label: "Tarefas", href: "/tarefas" },
      ],
    },
    {
      sectionTitle: "Configurações",
      items: [
        { icon: "mdi:account-box", label: "Minha Conta", href: "/minha-conta" },
        {
          icon: "material-symbols:logout-rounded",
          label: "Sair",
          onClick: () => signOut(),
        },
      ],
    },
  ];

  return (
    <Box>
      {navSections.map((section) => (
        <Box key={section.sectionTitle} sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ px: 2, py: 1, color: "text.secondary", textTransform: "uppercase" }}>
            {section.sectionTitle}
          </Typography>
          <List>
            {section.items.map((item) => {
              const isActive = item.href ? pathname.includes(item.href) : false;
              const buttonProps = item.href
                ? {
                    component: Link,
                    href: item.href,
                  }
                : {
                    onClick: item.onClick,
                  };

              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    {...buttonProps}
                    sx={{
                      gap: 1,
                      display: "flex",
                      borderRadius: 1,
                      marginBlock: "4px",
                      bgcolor: isActive ? "primary.light" : "transparent",
                      "&:hover": {
                        bgcolor: isActive ? "primary.light" : "action.hover",
                      },
                    }}
                  >
                    <Icon icon={item.icon} fontSize={24} />
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );
};
