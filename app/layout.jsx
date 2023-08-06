import "./globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthProvider from "@/components/auth-provider";
import ThemeProvider from "@/components/theme-provider";

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
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
