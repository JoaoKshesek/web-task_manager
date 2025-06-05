"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import yup from "@/configs/yup";

import { Button, ControlledInput, ControlledPasswordInput } from "@/components";
import toast from "react-hot-toast";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, CardContent, Grid, Tab } from "@mui/material";
import { useAccountUpdateMutation } from "@/store/queries/accountApi";

interface FieldValues {
  name: string;
  email: string;
  password?: string | null;
}

interface AccountUpdateStoreFormProps {
  formData?: Partial<FieldValues>;
}

interface ApiError extends Error {
  data?: {
    error?: string;
  };
}

const schema = yup.object().shape({
  name: yup.string().max(255).required().label("Nome"),
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().max(100).nullable().label("Senha"),
});

const defaultValues: FieldValues = {
  name: "",
  email: "",
  password: null,
};

export function AccountUpdateStoreForm({ formData }: AccountUpdateStoreFormProps) {
  const router = useRouter();

  const [accountUpdateRequest] = useAccountUpdateMutation();

  const [tab, setTab] = useState("account-details");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...defaultValues, ...formData },
    resolver: yupResolver(schema),
  });

  function handleTabsChange(event: SyntheticEvent, newValue: string) {
    setTab(newValue);
  }

  async function onSubmit(data: FieldValues) {
    try {
      await accountUpdateRequest({
        body: data,
      }).unwrap();

      toast.success("Conta editada com sucesso.");

      router.push(`/minha-conta`);
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
          <Tab value="account-details" label="Informações gerais" />
        </TabList>
        <form id={"create-account-form"} onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent>
            <TabPanel value="account-details">
              <Grid container spacing={2}>
                <Grid size={5}>
                  <ControlledInput<FieldValues>
                    label="Nome"
                    name="name"
                    control={control}
                    disabled={isSubmitting}
                    errorMessage={errors.name?.message}
                  />
                </Grid>
                <Grid size={4}>
                  <ControlledInput<FieldValues>
                    label="E-mail"
                    name="email"
                    control={control}
                    disabled={isSubmitting}
                    errorMessage={errors.email?.message}
                  />
                </Grid>

                <Grid size={3}>
                  <ControlledPasswordInput<FieldValues>
                    label="Senha"
                    name="password"
                    control={control}
                    disabled={isSubmitting}
                    errorMessage={errors.password?.message}
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

                <Grid container gap={2} size={9} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={isSubmitting}
                    label="Resetar"
                    sx={{ height: 40, width: 100 }}
                    onClick={() => reset()}
                  />
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    label="Atualizar"
                    type="submit"
                    sx={{ height: 40, width: 100 }}
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
