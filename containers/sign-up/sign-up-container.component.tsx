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
          <Image priority src="/assets/logos/logo.svg" width={40} height={40} alt="Logo" />
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
