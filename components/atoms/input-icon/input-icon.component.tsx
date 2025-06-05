import * as React from "react";

import { Icon } from "@/components";

import { Container } from "./input-icon.styles";

export type Alignment = "left" | "right";

interface Props {
  icon: string;
  alignment: Alignment;
}

export function InputIcon({ icon, alignment = "left" }: Props) {
  return (
    <Container alignment={alignment}>
      <Icon icon={icon} fontSize={20} />
    </Container>
  );
}
