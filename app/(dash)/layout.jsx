import "../globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth-provider";
import ThemeProvider from "@/components/theme-provider";
import DashHeader from "@/components/dash-header";
import Sidebar from "@/components/sidebar";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Jofex",
    template: `%s - Jofex`,
  },
  description: "A marketing website",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(`min-h-screen`, font.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="flex">
              <Sidebar />
              <div className="w-full">
                <DashHeader />
                {children}
              </div>
            </div>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
