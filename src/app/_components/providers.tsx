"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ToasterProvider } from "@/helpers/toaster";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
      <SidebarProvider>{children} <ToasterProvider /></SidebarProvider>
    </ThemeProvider>
  );
}
