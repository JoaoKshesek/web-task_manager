import { Box, Link, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box sx={{ py: 2, px: 3 }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()}, Desenvolvido por{" "}
        <Link
          href="https://joaokshesek.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="primary.main"
        >
          João Valter Kshesek
        </Link>
      </Typography>
    </Box>
  );
};
