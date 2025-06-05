"use client";
import React, { SyntheticEvent, useCallback, useState } from "react";

import { Card, CardContent, Grid, Tab } from "@mui/material";
import { Button, DialogRemoveAccount, GridFieldView, LoadingContainer, PageHeader, Section } from "@/components";
import { BreadcrumbsProps } from "@/components/atoms/breadcrumbs/breadcrumbs.component";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import toast from "react-hot-toast";
import { formatDate } from "@/_utils/date";
import { useAccountDeleteMutation, useAccountDetailsQuery } from "@/store/queries/accountApi";
import { useAppDispatch } from "@/_libs";
import { clearToken } from "@/store/reducers/commom/auth";
import Cookies from "js-cookie";

const breadcrumbs: BreadcrumbsProps["breadcrumbs"] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Minha conta" },
];

export const AccountDetailsContainer = () => {
  const dispatch = useAppDispatch();

  const [tab, setTab] = useState<string>("account-details");
  const [openDialogRemoveAccount, setOpenDialogRemoveAccount] = useState(false);

  const { data, isFetching } = useAccountDetailsQuery();
  const [accountDeleteRequest, { isLoading: isLoadingTaskDelete }] = useAccountDeleteMutation();

  function handleTabsChange(event: SyntheticEvent, newValue: string) {
    setTab(newValue);
  }

  const handleOpenDialogRemoveAccount = useCallback(() => {
    setOpenDialogRemoveAccount(true);
  }, []);

  const handleCloseDialogRemoveAccount = useCallback(() => {
    setOpenDialogRemoveAccount(false);
  }, []);

  const handleConfirmDialogRemoveAccount = useCallback(async () => {
    try {
      await accountDeleteRequest().unwrap();
      Cookies.remove("token");
      dispatch(clearToken());

      toast.success("Conta removida com sucesso.");
    } catch (err: any) {
      const apiErrors = err?.data?.errors || [];
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((message: string) => toast.error(message));
      } else {
        toast.error("Não foi possível remover sua conta.");
      }
    } finally {
      setOpenDialogRemoveAccount(false);
    }
  }, [accountDeleteRequest]);

  return (
    <Section>
      <Grid container spacing={4}>
        <PageHeader title={`Minha Conta`} breadcrumbs={breadcrumbs} />
        <Grid size={12}>
          {!isFetching && data ? (
            <Card>
              <TabContext value={tab}>
                <TabList
                  variant="scrollable"
                  onChange={handleTabsChange}
                  sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                  <Tab value="account-details" label="Informações gerais" />
                </TabList>
                <CardContent>
                  <TabPanel value="account-details">
                    <GridFieldView.Container>
                      <GridFieldView.Item size={1}>
                        <GridFieldView.FieldName>ID</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{data.id.toString()}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 12, md: 5, lg: 3 }}>
                        <GridFieldView.FieldName>Nome</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{data.name}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 12, md: 5, lg: 3 }}>
                        <GridFieldView.FieldName>E-mail</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{data.email}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Primeiro acesso</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{formatDate(data.created_at)}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <GridFieldView.Item size={{ xs: 6, md: 3, lg: 2 }}>
                        <GridFieldView.FieldName>Última atualização</GridFieldView.FieldName>
                        <GridFieldView.FieldValue>{formatDate(data.updated_at)}</GridFieldView.FieldValue>
                      </GridFieldView.Item>
                      <Grid container size={12} gap={2} justifyContent="flex-end">
                        <Button
                          variant="contained"
                          color="error"
                          label="Deletar conta"
                          sx={{ height: 40, minWidth: 100 }}
                          onClick={handleOpenDialogRemoveAccount}
                        />
                        <Button
                          variant="contained"
                          label="Editar"
                          href={`/minha-conta/editar`}
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
                <LoadingContainer description="Carregando dados da sua conta..." />
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      <DialogRemoveAccount
        open={openDialogRemoveAccount}
        handleClose={handleCloseDialogRemoveAccount}
        handleConfirm={handleConfirmDialogRemoveAccount}
        isLoading={isLoadingTaskDelete}
      />
    </Section>
  );
};
