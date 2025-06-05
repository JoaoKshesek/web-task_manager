import React, { useMemo } from "react";

import { DataGrid, DataGridProps, GridSortModel, GridSortDirection, GridLocaleText } from "@mui/x-data-grid";

export const localeTextPtBR: Partial<GridLocaleText> = {
  noRowsLabel: "Nenhuma linha",
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Mostrar colunas",
  columnMenuFilter: "Filtro",
  columnMenuHideColumn: "Ocultar",
  columnMenuUnsort: "Sem ordenação",
  columnMenuSortAsc: "Ordenar crescente",
  columnMenuSortDesc: "Ordenar decrescente",
};

interface Props
  extends Omit<
    DataGridProps,
    | "autoHeight"
    | "pagination"
    | "disableRowSelectionOnClick"
    | "disableColumnFilter"
    | "disableColumnMenu"
    | "sortModel"
    | "sortingMode"
    | "paginationMode"
    | "pageSizeOptions"
    | "localeText"
    | "initialState"
  > {
  ordination: string;
  page: number;
  pageSize: number;
  rowCount: number;
}

export function DataTablePaginated({ ordination, page, pageSize, ...dataGridProps }: Props) {
  const sortModel: GridSortModel = useMemo(() => {
    const model = ordination.split(",");

    return [{ field: model[0], sort: model[1] as GridSortDirection }];
  }, [ordination]);

  return (
    <DataGrid
      sx={{ background: "#fff" }}
      pagination
      disableRowSelectionOnClick
      disableColumnFilter
      disableColumnMenu
      sortModel={sortModel}
      sortingMode="server"
      paginationMode="server"
      pageSizeOptions={[10, 25, 50]}
      localeText={localeTextPtBR}
      initialState={{
        pagination: {
          paginationModel: {
            page,
            pageSize,
          },
        },
      }}
      {...dataGridProps}
    />
  );
}
