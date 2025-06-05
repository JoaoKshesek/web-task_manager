import * as React from "react";

import { Card, Grid } from "@mui/material";
import { PageHeader, Section } from "@/components";
import { BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { TaskStoreForm } from "@/views";

const breadcrumbs: BreadcrumbsProps["breadcrumbs"] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tarefas", href: "/tarefas" },
  { label: "Cadastrar Tarefa" },
];

export const TaskCreateContainer = () => {
  return (
    <Section>
      <Grid container spacing={4}>
        <PageHeader title="Cadastrar Tarefa" breadcrumbs={breadcrumbs} />
        <Grid size={{ xs: 12, md: 12 }}>
          <Card>
            <TaskStoreForm />
          </Card>
        </Grid>
      </Grid>
    </Section>
  );
};
