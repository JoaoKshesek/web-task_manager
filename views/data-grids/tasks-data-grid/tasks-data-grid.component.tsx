"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Box, Card } from "@mui/material";
import { GridColDef, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

import { DataGridCell, DataTablePaginated, Icon, DialogRemoveRecord } from "@/components";
import { Toolbar } from "./toolbar.component";
import OptionsMenu from "@/components/molecules/option-menu/option-menu.component";

import { useAppDispatch, useAppSelector } from "@/_libs";
import { useTaskDeleteMutation, useTaskListQuery } from "@/store/queries/taskApi";
import { TaskListEntity } from "@/types/queries/task/task-list-response";
import { setListOptions } from "@/store/reducers/modules/task-module";
import { formatDate } from "@/_utils/date";
import { getOptionLabel, getOptionColor, priorityOptions, statusOptions } from "@/_utils/task";
import { useRouter } from "next/navigation";

export function TasksDataGrid() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const listOptions = useAppSelector((state) => state.taskModule.listOptions);

  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState<TaskListEntity[]>([]);
  const [removeRecordId, setRemoveRecordId] = useState<string | null>(null);
  const [openDialogRemoveRecord, setOpenDialogRemoveRecord] = useState(false);

  const {
    data: listTaskData,
    isFetching: isLoadingTaskList,
    error,
  } = useTaskListQuery({
    ordination: listOptions.ordination,
    page: listOptions.page,
    per_page: listOptions.perPage,
    q: listOptions.searchValue || undefined,
  });

  const [taskDeleteRequest, { isLoading: isLoadingTaskDelete }] = useTaskDeleteMutation();

  const columns = useMemo<GridColDef<TaskListEntity>[]>(
    () => [
      {
        width: 80,
        field: "id",
        headerName: "#",
        renderCell: ({ row }) => <DataGridCell value={row.id.toString()} />,
      },
      {
        minWidth: 280,
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
      {
        width: 90,
        field: "actions",
        headerName: "Ações",
        sortable: false,
        renderCell: ({ row }) => (
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: "small" }}
            menuProps={{ sx: { "& .MuiMenuItem-root svg": { mr: 2 } } }}
            options={[
              {
                text: "Detalhes",
                href: `/tarefas/${row.id}`,
                icon: <Icon icon="mdi:newspaper-variant-outline" fontSize={20} />,
              },
              {
                divider: true,
              },
              {
                text: "Editar",
                href: `/tarefas/${row.id}/editar`,
                icon: <Icon icon="mdi:square-edit-outline" fontSize={20} />,
              },
              {
                text: "Deletar",
                menuItemProps: {
                  onClick: () => handleOpenDialogRemoveRecord(row.id.toString()),
                },
                icon: <Icon icon="mdi:trash-can-outline" fontSize={20} />,
              },
            ]}
          />
        ),
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

  const handleOpenDialogRemoveRecord = useCallback((id: string) => {
    setRemoveRecordId(id);
    setOpenDialogRemoveRecord(true);
  }, []);

  const handleCloseDialogRemoveRecord = useCallback(() => {
    setOpenDialogRemoveRecord(false);
  }, []);

  const handleConfirmDialogRemoveRecord = useCallback(async () => {
    if (!removeRecordId) return;

    try {
      await taskDeleteRequest(parseInt(removeRecordId)).unwrap();
      toast.success("Tarefa removida com sucesso.");
    } catch (err: any) {
      const apiErrors = err?.data?.errors || [];
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((message: string) => toast.error(message));
      } else {
        toast.error("Não foi possível remover a tarefa.");
      }
    } finally {
      setRemoveRecordId(null);
      setOpenDialogRemoveRecord(false);
    }
  }, [removeRecordId, taskDeleteRequest]);

  useEffect(() => {
    if (listTaskData) {
      setTotal(listTaskData.total);
      setRows(listTaskData.data);
    }
  }, [listTaskData]);

  useEffect(() => {
    if (error) {
      toast.error("Não foi possível carregar suas tarefas");

      router.replace("/dashboard");
    }
  }, [error]);

  return (
    <Card sx={{ maxWidth: "76vw" }}>
      <Toolbar />
      <Box padding={4}>
        <DataTablePaginated
          rows={rows}
          rowCount={total}
          columns={columns}
          page={listOptions.page - 1}
          pageSize={listOptions.perPage}
          ordination={listOptions.ordination}
          loading={isLoadingTaskList}
          onSortModelChange={onSortModelChange}
          onPaginationModelChange={onPaginationModelChange}
        />
      </Box>
      <DialogRemoveRecord
        open={openDialogRemoveRecord}
        handleClose={handleCloseDialogRemoveRecord}
        handleConfirm={handleConfirmDialogRemoveRecord}
        isLoading={isLoadingTaskDelete}
      />
    </Card>
  );
}
