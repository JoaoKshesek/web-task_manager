import Providers from "@/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Gerenciador de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
