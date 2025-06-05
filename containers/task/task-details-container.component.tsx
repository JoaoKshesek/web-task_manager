"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";

import { Card, CardContent, Grid, Tab } from "@mui/material";
import { Button, GridFieldView, LoadingContainer, PageHeader, Section } from "@/components";
import { BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { useTaskDetailsQuery } from "@/store/queries/taskApi";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatDate } from "@/_utils/date";
import { getOptionColor, getOptionLabel, priorityOptions, statusOptions } from "@/_utils/task";

interface TaskDetailsContainerProps {
  taskId: number;
}

const breadcrumbs: BreadcrumbsProps["breadcrumbs"] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tarefas", href: "/tarefas" },
  { label: "Vizualizar Tarefa" },
];

export const TaskDetailsContainer = ({ taskId }: TaskDetailsContainerProps) => {
  const router = useRouter();

  const { data, isFetching, error } = useTaskDetailsQuery(taskId);

  const [tab, setTab] = useState<string>("task-details");

  function handleTabsChange(event: SyntheticEvent, newValue: string) {
    setTab(newValue);
  }

  useEffect(() => {
    if (error) {
      toast.error("Não foi possível encontrar a tarefa");

      router.replace("/tarefas");
    }
  }, [error]);

  return (
    <Section>
      <Grid container spacing={4}>
        <PageHeader title={`Visualizar Tarefa #${taskId}`} breadcrumbs={breadcrumbs} />
        <Grid size={12}>
          {!isFetching && data ? (
            <Card>
              <TabContext value={tab}>
                <TabList
                  variant="scrollable"
                  onChange={handleTabsChange}
                  sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                  <Tab value="task-details" label="Informações gerais" />
                </TabList>
                <CardContent>
                  <TabPanel value="task-details">
                    <GridFieldView.Container>
                      <GridFieldView.Item size={{ xs: 2, md: 1, lg: 1 }}>
                        <GridFieldView.FieldName>ID</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{data.id.toString()}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 10, md: 5, lg: 3 }}>
                        <GridFieldView.FieldName>Título</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{data.title}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Data de Início</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{formatDate(data.start_date)}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Data de Vencimento</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{formatDate(data.due_date)}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Prioridade</GridFieldView.FieldName>
                        <GridFieldView.FieldChip
                          label={getOptionLabel(priorityOptions, data.priority)}
                          color={getOptionColor(priorityOptions, data.priority)}
                          size="small"
                        />
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Status</GridFieldView.FieldName>
                        <GridFieldView.FieldChip
                          label={getOptionLabel(statusOptions, data.status)}
                          color={getOptionColor(statusOptions, data.status)}
                          size="small"
                        />
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Criado em</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{formatDate(data.created_at)}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Última atualização</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{formatDate(data.updated_at)}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <Grid container size={12} justifyContent="space-between">
                        <Button
                          variant="outlined"
                          color="secondary"
                          label="Voltar"
                          sx={{ height: 40, width: 100 }}
                          onClick={() => router.back()}
                        />
                        <Button
                          variant="contained"
                          label="Editar"
                          href={`/tarefas/${data.id}/editar`}
                          sx={{ height: 40, width: 100 }}
                        />
                      </Grid>
                    </GridFieldView.Container>
                  </TabPanel>
                </CardContent>
              </TabContext>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <LoadingContainer description="Carregando dados da tarefa..." />
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Section>
  );
};
