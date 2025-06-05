"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import yup from "@/configs/yup";

import { Button, ControlledDatePicker, ControlledInput, ControlledSelect, ControlledTextarea } from "@/components";
import toast from "react-hot-toast";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, CardContent, Grid, Tab } from "@mui/material";
import { useTaskCreateMutation, useTaskUpdateMutation } from "@/store/queries/taskApi";

interface Option {
  label: string;
  value: string;
}

interface FieldValues {
  title: string;
  start_date: Date;
  due_date: Date;
  priority: string;
  status: string;
  description: string;
}

interface TaskStoreFormProps {
  taskId?: number;
  formData?: Partial<FieldValues>;
}

interface ApiError extends Error {
  data?: {
    error: string;
  };
}

const priorityOptions: Option[] = [
  { label: "Baixa", value: "low" },
  { label: "Média", value: "medium" },
  { label: "Alta", value: "high" },
  { label: "Urgente", value: "urgent" },
];

const statusOptions: Option[] = [
  { label: "Não iniciado", value: "not_started" },
  { label: "Em progresso", value: "in_progress" },
  { label: "Completo", value: "completed" },
  { label: "Cancelado", value: "cancelled" },
];

const schema = yup.object().shape({
  title: yup.string().max(100).required().label("E-mail"),
  start_date: yup.date().typeError("Data de Início inválida").required().label("Data de Início"),
  due_date: yup
    .date()
    .typeError("Data de Vencimento inválida")
    .min(yup.ref("start_date"), "A Data de Vencimento deve ser igual ou posterior à Data de Início")
    .required()
    .label("Data de Vencimento"),
  priority: yup.string().max(255).required().label("Prioridade"),
  status: yup.string().max(255).required().label("Status"),
  description: yup.string().max(255).required().label("Descrição"),
});

const defaultValues: FieldValues = {
  title: "",
  start_date: new Date(),
  due_date: new Date(),
  priority: "low",
  status: "not_started",
  description: "",
};

export function TaskStoreForm({ taskId, formData }: TaskStoreFormProps) {
  const router = useRouter();

  const [taskCreateRequest] = useTaskCreateMutation();
  const [taskUpdateRequest] = useTaskUpdateMutation();

  const [tab, setTab] = useState("task-details");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: taskId ? { ...defaultValues, ...formData } : defaultValues,
    resolver: yupResolver(schema),
  });

  function handleTabsChange(event: SyntheticEvent, newValue: string) {
    setTab(newValue);
  }

  async function onSubmit(data: FieldValues) {
    try {
      if (taskId) {
        await taskUpdateRequest({
          taskId,
          body: data,
        }).unwrap();

        toast.success("Tarefa editada com sucesso.");

        router.push(`/tarefas/${taskId}`);
      } else {
        const response = await taskCreateRequest(data).unwrap();

        toast.success("Tarefa criada com sucesso.");

        router.push(`/tarefas/${response.id}`);
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;

      if (apiError.data?.error) {
        toast.error(apiError.data?.error);
      } else if (apiError instanceof Error) {
        toast.error(`Ocorreu um erro inesperado: ${apiError.message}`);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  }

  return (
    <Card>
      <TabContext value={tab}>
        <TabList
          variant="scrollable"
          onChange={handleTabsChange}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab value="task-details" label="Informações gerais" />
        </TabList>
        <form id={"create-task-form"} onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent>
            <TabPanel value="task-details">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <ControlledInput<FieldValues>
                    label="Titulo"
                    name="title"
                    placeholder="Deploy Servidor"
                    control={control}
                    disabled={isSubmitting}
                    errorMessage={errors.title?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                  <ControlledDatePicker
                    label="Data de Início"
                    name="start_date"
                    control={control}
                    disabled={isSubmitting}
                    errorMessage={errors.start_date?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                  <ControlledDatePicker
                    label="Data de Vencimento"
                    name="due_date"
                    control={control}
                    disabled={isSubmitting}
                    errorMessage={errors.due_date?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                  <ControlledSelect
                    label="Prioridade"
                    name="priority"
                    control={control}
                    options={priorityOptions}
                    disabled={isSubmitting}
                    errorMessage={errors.priority?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                  <ControlledSelect
                    label="Status"
                    name="status"
                    control={control}
                    options={statusOptions}
                    disabled={isSubmitting}
                    errorMessage={errors.status?.message}
                  />
                </Grid>
                <Grid size={12}>
                  <ControlledTextarea<FieldValues>
                    label="Descrição"
                    name="description"
                    placeholder="Fazer o deploy do servidor de homologação..."
                    control={control}
                    disabled={isSubmitting}
                    errorMessage={errors.description?.message}
                  />
                </Grid>
                <Grid container size={3}>
                  <Button
                    variant="text"
                    color="secondary"
                    disabled={isSubmitting}
                    label="Voltar"
                    sx={{ height: 40, width: 100 }}
                    onClick={() => router.back()}
                  />
                </Grid>

                <Grid container gap={2} size={{ xs: 12, md: 9 }} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={isSubmitting}
                    label="Resetar"
                    sx={{ height: 40, width: { xs: '45%', md: 100 } }}
                    onClick={() => reset()}
                  />
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    label={taskId ? "Editar" : "Criar"}
                    type="submit"
                    sx={{ height: 40, width: { xs: '45%', md: 100 } }}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>
        </form>
      </TabContext>
    </Card>
  );
}
