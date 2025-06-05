"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const PageHome = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/entrar");
    }
  }, [router]);

  return;
};

export default PageHome;
