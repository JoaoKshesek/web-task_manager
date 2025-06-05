"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { clearToken, setToken } from "@/store/reducers/commom/auth";
import Cookies from "js-cookie";   

interface Props {
  middleware: "guest" | "auth";
  redirectIfAuthenticated?: string;
}

export function useAuthentication({ middleware, redirectIfAuthenticated }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const token = useAppSelector((state) => state.auth.token);

  function signIn(token: string) {
    dispatch(setToken(token));
  }

  function signOut() {
    Cookies.remove("token"); 
    dispatch(clearToken());

    if (pathname !== "/") {
      router.refresh();
    } else {
      router.push("/");
    }
  }

  return { token, signIn, signOut };
}
