import "../globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth-provider";
import ThemeProvider from "@/components/theme-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin-header";
import AdminSidebar from "@/components/admin-sidebar";

const font = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const revalidate = 0;

export const metadata = {
  title: {
    default: "Jofex",
  },
  description: "A marketing website",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.username !== "admin") {
    redirect("/");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(``, font.className)}>
        <div className="minh-h-screen">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <div className="flex">
                <AdminSidebar />
                <div className="w-full">
                  <AdminHeader user={session.user} />
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
