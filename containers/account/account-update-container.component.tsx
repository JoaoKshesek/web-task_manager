"use client";
import React, { useEffect } from "react";

import { Card, CardContent, Grid } from "@mui/material";
import { LoadingContainer, PageHeader, Section } from "@/components";
import { BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { AccountUpdateStoreForm } from "@/views";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { useAccountDetailsQuery } from "@/store/queries/accountApi";

const breadcrumbs: BreadcrumbsProps["breadcrumbs"] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Minha conta", href: "/minha-conta" },
  { label: "Editar" },
];

export const AccountUpdateContainer = () => {
  const router = useRouter();

  const { data, isFetching, error } = useAccountDetailsQuery();

  useEffect(() => {
    if (error) {
      toast.error("Não foi possível acessar sua conta");

      router.replace("/dashboard");
    }
  }, [error]);

  return (
    <Section>
      <Grid container spacing={4}>
        <PageHeader title={`Editar Minha Conta`} breadcrumbs={breadcrumbs} />
        <Grid size={{ xs: 12, md: 12 }}>
          {!isFetching && data ? (
            <AccountUpdateStoreForm
              formData={{
                name: data.name,
                email: data.email,
              }}
            />
          ) : (
            <Card>
              <CardContent>
                <LoadingContainer description="Carregando dados da sua conta..." />
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Section>
  );
};
