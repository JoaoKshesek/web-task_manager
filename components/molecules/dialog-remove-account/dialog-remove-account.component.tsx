import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogProps,
  useTheme,
} from "@mui/material";

import { Button } from "@/components";

interface Props extends Omit<DialogProps, "onClose"> {
  handleClose: () => void;
  handleConfirm: () => void;
  isLoading?: boolean;
}

export function DialogRemoveAccount({ handleClose, handleConfirm, isLoading, ...dialogProps }: Props) {
  const theme = useTheme();

  return (
    <Dialog
      disableEscapeKeyDown
      aria-labelledby="dialog-remove-account-title"
      aria-describedby="dialog-remove-account-description"
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && !isLoading) {
          handleClose();
        }
      }}
      sx={{}}
      {...dialogProps}
    >
      <DialogTitle
        sx={{ background: theme.palette.primary.main, color: theme.palette.light[300] }}
        id="dialog-remove-account-title"
      >
        Tem certeza que deseja deletar sua conta?
      </DialogTitle>
      <DialogContent sx={{ justifyContent: "flex-start", padding: 1, minHeight: 100 }}>
        <DialogContentText sx={{ padding: 2, textAlign: "justify" }} id="dialog-remove-account-description">
          Após deletar não será possível recuperá-la novamente.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        className="dialog-actions-dense"
        sx={{ justifyContent: "space-between", padding: 2, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <Button
          onClick={handleClose}
          label="Cancelar"
          disabled={isLoading}
          color="secondary"
          variant="outlined"
          sx={{ height: 40 }}
        />
        <Button
          onClick={handleConfirm}
          label="Deletar"
          isLoading={isLoading}
          color="error"
          variant="contained"
          sx={{ height: 40 }}
        />
      </DialogActions>
    </Dialog>
  );
}
