import * as React from "react";

import { SignInStoreForm } from "@/views";
import { Box, Card, CardContent, Typography, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";

export const SignInContainer = () => {
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
          <Typography>Por favor, entre na sua conta</Typography>
        </Box>
        <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          <SignInStoreForm />
          <Typography textAlign="center">
            Ainda não possui uma conta?{" "}
            <MuiLink
              component={NextLink}
              href="/cadastre-se"
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
              Cadastre-se
            </MuiLink>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
