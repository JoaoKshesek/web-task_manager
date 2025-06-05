import * as React from "react";

import Image from "next/image";
import NextLink from "next/link";

import { Box, Card, CardContent, Typography, Link as MuiLink } from "@mui/material";

import { SignUpStoreForm } from "@/views";

export const SignUpContainer = () => {
  return (
    <Card>
      <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            background: "#240046",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 0C31.0353 0 40 8.96471 40 20C40 31.0353 31.0353 40 20 40C8.96471 40 0 31.0353 0 20C0 16.4 0.964708 12.8706 2.8 9.81177L3.52942 8.58823L4.14117 9.12942L13.2 18.1882C13.0285 18.7769 12.9413 19.3869 12.9412 20C12.9412 23.8824 16.1176 27.0588 20 27.0588C23.8824 27.0588 27.0588 23.8824 27.0588 20C27.0588 16.1176 23.8824 12.9412 20 12.9412C19.6 12.9412 19.2 12.9882 18.8235 13.0588V0H20ZM6.71529 5.04942L17.6235 15.96C18.3247 15.5482 19.1294 15.2941 20 15.2941C22.5953 15.2941 24.7059 17.4047 24.7059 20C24.7059 22.5953 22.5953 24.7059 20 24.7059C17.4047 24.7059 15.2941 22.5953 15.2941 20C15.2941 19.1294 15.5482 18.3247 15.96 17.6235L5.04942 6.71527L6.71529 5.04942Z"
              fill="#7B2CBF"
            />
          </svg>
          <Typography variant="h1" sx={{ fontWeight: 700, fontSize: 28, color: "#fff" }}>
            Task Manager
          </Typography>
        </Box>
        <Box sx={{ px: 2, displax: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 600, fontSize: 20 }}>
            Seja bem vindo!
          </Typography>
          <Typography>Por favor, faça seu cadastro</Typography>
        </Box>
        <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          <SignUpStoreForm />
          <Typography textAlign="center">
            Já possui uma conta?{" "}
            <MuiLink
              component={NextLink}
              href="/entrar"
              underline="none"
              sx={{
                color: "primary.main",
                fontSize: 16,
                fontWeight: 500,
                transition: "all ease-in 150ms",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Faça seu login
            </MuiLink>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
