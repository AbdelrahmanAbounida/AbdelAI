import React from "react";
import { ThemeProvider } from "./theme-provider";
import ModalProvider from "./modal-provider";
import { AuthProvider } from "./auth-provider";
import { Toaster } from "@/components/ui/sonner";

export const AllProviders = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Toaster />
        <ModalProvider />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};
