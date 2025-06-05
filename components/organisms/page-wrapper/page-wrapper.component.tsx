import * as React from "react";
import type { FunctionComponent, ReactNode } from "react";
import { PageWrapperContainer } from "./page-wrapper.styles";

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({ children }) => {
  return <PageWrapperContainer>{children}</PageWrapperContainer>;
};
