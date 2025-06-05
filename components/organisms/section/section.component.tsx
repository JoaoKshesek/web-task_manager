import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

export const Section = ({ children }: SectionProps) => {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%", flex: 1 }}>
      <Box
        sx={{ width: "100%", padding: { xs: 0, md: "28px" }, display: "flex", flexDirection: "column", gap: "30px" }}
      >
        {children}
      </Box>
    </Box>
  );
};
