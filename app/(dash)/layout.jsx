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
    default: "Jofex Marketing",
  },
  description:
    "Authentic destination for lucrative opportunities in the world of marketing. Uncover a reliable platform where you can effortlessly earn commissions by harnessing the power of referrals. Our proven system empowers you to share exceptional products and services with others while reaping the rewards of your influence.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const revalidate = 0;

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
