"use client";
import * as React from "react";

import { Card, Grid, Typography, useTheme } from "@mui/material";
import { PageHeader, Section } from "@/components";
import { BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { DashboardTasksDataGrid } from "@/views";
import { useDashboardStatsQuery } from "@/store/queries/dashboardApi";
import { getOptionColor, getOptionLabel, statusOptions } from "@/_utils/task";

export const DashboardContainer = () => {
  const theme = useTheme();
  const { data: dashboardStats, isFetching: isLoadingDashboardStats } = useDashboardStatsQuery();

  return (
    <Section>
      <Grid container spacing={4}>
        <PageHeader title="Dashboard" />
        {!isLoadingDashboardStats && dashboardStats && (
          <Grid container spacing={2} size={{ xs: 12, md: 12 }}>
            {dashboardStats.stats.map((item, index) => {
              const label = getOptionLabel(statusOptions, item.status);
              const color = getOptionColor(statusOptions, item.status) || "default";

              return (
                <Grid key={index} size={2}>
                  <Card
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: theme.palette[color]?.main || undefined,
                      color: theme.palette[color]?.main,
                      backgroundColor: theme.palette[color]?.light,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: 18, fontWeight: 600 }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 28, fontWeight: 700 }}>
                      {item.total}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Grid size={12}>
          <DashboardTasksDataGrid />
        </Grid>
      </Grid>
    </Section>
  );
};
