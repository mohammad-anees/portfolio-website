import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/navigation/sidebar";
import { NavBar } from "./components/navigation/navbar";

export const metadata: Metadata = {
  title: "Mohammad Anees",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-col w-full">
            <div className="md:hidden"><NavBar /></div>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </main>
        </SidebarProvider>
      </body>

    </html>

  );
}
