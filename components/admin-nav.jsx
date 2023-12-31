"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
import Link from "next/link";

function AdminNav() {
  const router = useRouter();
  const pathName = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: MdSpaceDashboard,
        label: "Dashboard",
        active: pathName === "/admin",
        href: "/admin",
      },
      {
        icon: RiLuggageDepositFill,
        label: "Deposit",
        active: pathName.startsWith("/admin/deposits"),
        href: "/admin/deposits",
      },
      {
        icon: BiMoneyWithdraw,
        label: "Withdrawal",
        active: pathName.startsWith("/admin/withdrawals"),
        href: "/admin/withdrawals",
      },
      {
        icon: FaUserShield,
        label: "Users",
        active: pathName.startsWith("/admin/users"),
        href: "/admin/users",
      },
    ],
    [pathName]
  );

  return (
    <nav>
      <Link href="/">
        <h1 className="text-2xl font-bold mb-8 px-3">Jefox</h1>
      </Link>
      <div className="flex flex-col space-y-2">
        {routes.map((route) => (
          <Link href={route.href} key={route.href} prefetch={false}>
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              active={route.active}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default AdminNav;
