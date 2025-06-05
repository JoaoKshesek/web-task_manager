"use client";
import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import yup from "@/configs/yup";
import { useSignInMutation } from "@/store/queries/authApi";

import { Button, ControlledInput, ControlledPasswordInput } from "@/components";
import toast from "react-hot-toast";
import { Grid } from "@mui/material";
import { useAuthentication } from "@/_libs";

interface FieldValues {
  email: string;
  password: string;
}

interface ApiError extends Error {
  data?: {
    error?: string;
  };
}

const schema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().max(100).required().label("Senha"),
});

const defaultValues: FieldValues = {
  email: "",
  password: "",
};

export function SignInStoreForm() {
  const router = useRouter();
  const { signIn } = useAuthentication({ middleware: "guest" });

  const [signInRequest] = useSignInMutation();

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
      const response = await signInRequest(data).unwrap();

      if (response.token) {
        signIn(response.token);
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
            label="E-mail"
            name="email"
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
        <Grid size={12} margin="0 auto">
          <Button variant="contained" disabled={false} label="Entrar" type="submit" fullWidth sx={{ height: 48 }} />
        </Grid>
      </Grid>
    </form>
  );
}
