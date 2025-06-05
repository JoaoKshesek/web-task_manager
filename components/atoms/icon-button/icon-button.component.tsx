import * as React from "react";

import { IconButtonProps } from "@mui/material/IconButton";

import { Icon } from "@/components";

import { Button } from "./icon-button.styles";

interface Props extends IconButtonProps {
  icon: string;
}

export function IconButton({ icon, ...props }: Props) {
  return (
    <Button {...props}>
      <Icon icon={icon} fontSize={20} />
    </Button>
  );
}
