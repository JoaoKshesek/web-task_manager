"use client";
import React, { useEffect } from "react";

import { Card, CardContent, Grid } from "@mui/material";
import { LoadingContainer, PageHeader, Section } from "@/components";
import { BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { TaskStoreForm } from "@/views";
import { useRouter } from "next/navigation";
import { useTaskDetailsQuery } from "@/store/queries/taskApi";
import toast from "react-hot-toast";
import { toLocalDateOnly } from "@/_utils/date";

interface TaskUpdateContainerProps {
  taskId: number;
}

const breadcrumbs: BreadcrumbsProps["breadcrumbs"] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tarefas", href: "/tarefas" },
  { label: "Editar Tarefa" },
];

export const TaskUpdateContainer = ({ taskId }: TaskUpdateContainerProps) => {
  const router = useRouter();

  const { data, isFetching, error } = useTaskDetailsQuery(taskId);

  useEffect(() => {
    if (error) {
      toast.error("Não foi possível encontrar a tarefa");

      router.replace("/tarefas");
    }
  }, [error]);

  return (
    <Section>
      <Grid container spacing={4}>
        <PageHeader title={`Editar Tarefa #${taskId}`} breadcrumbs={breadcrumbs} />
        <Grid size={{ xs: 12, md: 12 }}>
          {!isFetching && data ? (
            <TaskStoreForm
              taskId={data.id}
              formData={{
                title: data.title,
                start_date: toLocalDateOnly(data.start_date),
                due_date: toLocalDateOnly(data.due_date),
                priority: data.priority,
                status: data.status,
                description: data.description,
              }}
            />
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
