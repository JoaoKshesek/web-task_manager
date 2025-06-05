"use client";
import { styled } from "@mui/system";

export const Section = styled("section")({
  display: "flex",
  width: "100%",
  height: "100vh",
  maxWidth: "2500px",
  backgroundColor: "#ffffff",
});

export const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "20rem",
  width: "20rem",
  margin: "auto",
});
