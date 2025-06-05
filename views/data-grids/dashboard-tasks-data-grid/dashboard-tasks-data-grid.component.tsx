"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Card, Typography } from "@mui/material";
import { GridColDef, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

import { DataGridCell, DataTablePaginated } from "@/components";

import { useAppDispatch, useAppSelector } from "@/_libs";
import { useDashboardTaskListQuery } from "@/store/queries/dashboardApi";
import { DashboardUpcomingTaskListEntity } from "@/types/queries/dashboard/dashboard-upcoming-task-list-response";
import { setListOptions } from "@/store/reducers/modules/dashboard-module";
import { formatDate } from "@/_utils/date";
import { getOptionLabel, getOptionColor, priorityOptions, statusOptions } from "@/_utils/task";

export function DashboardTasksDataGrid() {
  const dispatch = useAppDispatch();
  const listOptions = useAppSelector((state) => state.dashboardModule.listOptions);

  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState<DashboardUpcomingTaskListEntity[]>([]);

  const { data: listDashboardData, isFetching: isLoadingDashboardList } = useDashboardTaskListQuery();

  const columns = useMemo<GridColDef<DashboardUpcomingTaskListEntity>[]>(
    () => [
      {
        width: 80,
        field: "id",
        headerName: "#",
        renderCell: ({ row }) => <DataGridCell value={row.id.toString()} />,
      },
      {
        minWidth: 360,
        field: "title",
        headerName: "Título",
        renderCell: ({ row }) => <DataGridCell value={row.title} withTooltip />,
      },
      {
        minWidth: 180,
        field: "start_date",
        headerName: "Data de Início",
        renderCell: ({ row }) => <DataGridCell value={formatDate(row.start_date)} withTooltip />,
      },
      {
        minWidth: 180,
        field: "due_date",
        headerName: "Data de Vencimento",
        renderCell: ({ row }) => <DataGridCell value={formatDate(row.due_date)} withTooltip />,
      },
      {
        minWidth: 160,
        field: "priority",
        headerName: "Prioridade",
        renderCell: ({ row }) => (
          <DataGridCell
            value={getOptionLabel(priorityOptions, row.priority)}
            variant="chip"
            chipColor={getOptionColor(priorityOptions, row.priority)}
          />
        ),
      },
      {
        minWidth: 160,
        field: "status",
        headerName: "Status",
        renderCell: ({ row }) => (
          <DataGridCell
            value={getOptionLabel(statusOptions, row.status)}
            variant="chip"
            chipColor={getOptionColor(statusOptions, row.status)}
          />
        ),
      },
      {
        minWidth: 160,
        field: "updated_at",
        headerName: "Última atualização",
        renderCell: ({ row }) => <DataGridCell value={formatDate(row.updated_at)} withTooltip />,
      },
    ],
    []
  );

  const onSortModelChange = useCallback(
    (model: GridSortModel) => {
      if (model.length > 0) {
        const value = `${model[0].field},${model[0].sort}`;
        dispatch(setListOptions({ ordination: value }));
      } else {
        dispatch(setListOptions({ ordination: "id,asc" }));
      }
    },
    [dispatch]
  );

  const onPaginationModelChange = useCallback(
    (model: GridPaginationModel) => {
      dispatch(
        setListOptions({
          page: listOptions.perPage !== model.pageSize ? 1 : model.page + 1,
          perPage: model.pageSize,
        })
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch, listOptions.perPage]
  );

  useEffect(() => {
    if (listDashboardData) {
      setTotal(listDashboardData.total);
      setRows(listDashboardData.data);
    }
  }, [listDashboardData]);

  return (
    <Card sx={{ padding: 0 }}>
      <Box padding={4} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 500 }}>
          Tarefas com vencimento mais próximo
        </Typography>
        <DataTablePaginated
          rows={rows}
          rowCount={total}
          columns={columns}
          page={listOptions.page - 1}
          pageSize={listOptions.perPage}
          ordination={listOptions.ordination}
          loading={isLoadingDashboardList}
          onSortModelChange={onSortModelChange}
          onPaginationModelChange={onPaginationModelChange}
        />
      </Box>
    </Card>
  );
}
