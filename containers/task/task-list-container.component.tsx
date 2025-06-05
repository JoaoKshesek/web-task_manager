import * as React from "react";

import { Grid } from "@mui/material";
import { PageHeader, Section } from "@/components";
import { BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { TasksDataGrid } from "@/views";

const breadcrumbs: BreadcrumbsProps["breadcrumbs"] = [{ label: "Dashboard", href: "/dashboard" }, { label: "Tarefas" }];

export const TaskListContainer = () => {
  return (
    <Section>
      <Grid container spacing={4}>
        <PageHeader title="Lista de Tarefas" breadcrumbs={breadcrumbs} />
        <Grid size={{ xs: 12, md: 12 }}>
          <TasksDataGrid />
        </Grid>
      </Grid>
    </Section>
  );
};
