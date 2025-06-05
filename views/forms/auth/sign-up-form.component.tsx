"use client";
import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import yup from "@/configs/yup";
import { useSignUpMutation } from "@/store/queries/authApi";

import { Button, ControlledInput, ControlledPasswordInput } from "@/components";
import toast from "react-hot-toast";
import { Grid } from "@mui/material";
import { useAuthentication } from "@/_libs";

interface FieldValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ApiError extends Error {
  data?: {
    error: string;
  };
}

const schema = yup.object().shape({
  name: yup.string().max(255).required().label("Nome"),
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().max(100).required().label("Senha"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .max(100)
    .required()
    .label("Confirmar senha"),
});

const defaultValues: FieldValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export function SignUpStoreForm() {
  const router = useRouter();
  const { signIn } = useAuthentication({ middleware: "guest" });

  const [signUpRequest] = useSignUpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FieldValues) {
    try {
      const response = await signUpRequest(data).unwrap();

      if (response.token) {
        signIn(response.token);
        toast.success("Conta criada com sucesso!");
        Cookies.set("token", response.token);
        router.push("/dashboard");
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
    <form id={"sign-in-form"} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid size={12}>
          <ControlledInput<FieldValues>
            label="Nome"
            name="name"
            placeholder="Novo Usuário"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.name?.message}
          />
        </Grid>
        <Grid size={12}>
          <ControlledInput<FieldValues>
            label="E-mail"
            name="email"
            placeholder="usuario@email.com"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.email?.message}
          />
        </Grid>

        <Grid size={12}>
          <ControlledPasswordInput<FieldValues>
            label="Senha"
            name="password"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.password?.message}
          />
        </Grid>
        <Grid size={12}>
          <ControlledPasswordInput<FieldValues>
            label="Confirmar senha"
            name="password_confirmation"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.password_confirmation?.message}
          />
        </Grid>
        <Grid size={12} margin="0 auto">
          <Button variant="contained" disabled={isSubmitting} label="Cadastrar" type="submit" fullWidth sx={{ height: 48 }} />
        </Grid>
      </Grid>
    </form>
  );
}
