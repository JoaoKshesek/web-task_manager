import React, { ReactNode } from "react";

import { Container } from "./toolbar-container.styles";

interface Props {
  children: ReactNode;
}

export function ToolbarContainer({ children }: Props) {
  return <Container>{children}</Container>;
}
