import "../globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import DashHeader from "@/components/dash-header";
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

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(``, font.className)}>
        <div className="minh-h-screen">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <div className="flex">
                <Sidebar />
                <div className="w-full">
                  <DashHeader user={session.user} />
                  {children}
                </div>
              </div>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
