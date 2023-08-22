import "../globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth-provider";
import ThemeProvider from "@/components/theme-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Jofex Marketing",
  },
  description:
    "Authentic destination for lucrative opportunities in the world of marketing. Uncover a reliable platform where you can effortlessly earn commissions by harnessing the power of referrals. Our proven system empowers you to share exceptional products and services with others while reaping the rewards of your influence.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export const revalidate = 0;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(`min-h-screen`, font.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
