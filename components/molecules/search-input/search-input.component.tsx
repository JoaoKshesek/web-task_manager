import * as React from "react";

import { TextFieldProps } from "@mui/material";

import { IconButton, Input, InputIcon } from "@/components";

type Props = TextFieldProps & {
  onClear: () => void;
};

export function SearchInput({ placeholder = "Pesquisar...", onClear, ...props }: Props) {
  return (
    <Input
      {...props}
      placeholder={placeholder}
      InputProps={{
        startAdornment: <InputIcon icon="mdi:magnify" alignment="left" />,
        endAdornment: props.value ? (
          <IconButton title="Limpar" aria-label="Limpar" icon="mdi:close" onClick={onClear} />
        ) : undefined,
      }}
    />
  );
}
