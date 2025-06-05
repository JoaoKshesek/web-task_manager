"use client";

import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography, Collapse } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Icon } from "@/components";
import { useAuthentication } from "@/_libs";
import { useState, FC } from "react";

interface ChildItem {
  label: string;
  href: string;
}

interface NavItem {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
  children?: ChildItem[];
}

interface NavSection {
  sectionTitle: string;
  items: NavItem[];
}
interface SidebarProps {
  onItemClick: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ onItemClick }) => {
  const pathname = usePathname();
  const { signOut } = useAuthentication({ middleware: "auth" });
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const handleItemClick = () => {
    if (onItemClick) onItemClick();
  };

  const handleToggle = (label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const navSections: NavSection[] = [
    {
      sectionTitle: "Aplicação",
      items: [
        { icon: "material-symbols:dashboard-rounded", label: "Dashboard", href: "/dashboard" },
        { icon: "mdi:clipboard-text-clock", label: "Tarefas", href: "/tarefas" },
        { icon: "mdi:account-box", label: "Minha Conta", href: "/minha-conta" },
        {
          icon: "material-symbols:logout-rounded",
          label: "Sair",
          onClick: () => signOut(),
        },
      ],
    },
    {
      sectionTitle: "Documentação",
      items: [
        {
          icon: "mdi:github",
          label: "Github",
          children: [
            { label: "Frontend", href: "https://github.com/JoaoKshesek/web-task_manager" },
            { label: "Backend", href: "https://github.com/JoaoKshesek/api-task_manager" },
          ],
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

              if (item.children) {
                const isOpen = openDropdowns[item.label] ?? false;
                return (
                  <Box key={item.label}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleToggle(item.label)}
                        sx={{
                          gap: 1,
                          display: "flex",
                          borderRadius: 1,
                          marginBlock: "4px",
                          bgcolor: isOpen ? "primary.light" : "transparent",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.2)",
                          },
                        }}
                      >
                        <Icon icon={item.icon} fontSize={24} />
                        <ListItemText primary={item.label} />
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child) => (
                          <ListItem key={child.label} disablePadding>
                            <ListItemButton
                              component="a"
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                borderRadius: 1,
                                marginBlock: "4px",
                                pl: 2,
                                "&:hover": {
                                  bgcolor: "rgba(255,255,255,0.2)",
                                },
                              }}
                            >
                              <Icon icon={"mdi:dot"} fontSize={24} />
                              <ListItemText primary={child.label} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              }

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
                    onClick={() => {
                      buttonProps.onClick && buttonProps.onClick();
                      handleItemClick();
                    }}
                    sx={{
                      gap: 1,
                      display: "flex",
                      borderRadius: 1,
                      marginBlock: "4px",
                      bgcolor: isActive ? "primary.light" : "transparent",
                      "&:hover": {
                        bgcolor: isActive ? "primary.light" : "rgba(255,255,255,0.2)",
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
