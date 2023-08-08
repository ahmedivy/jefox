"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { FaUserShield } from "react-icons/fa";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbBinaryTree } from "react-icons/tb";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: MdSpaceDashboard,
        label: "Dashboard",
        active: pathName === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: IoMdPricetags,
        label: "Plans",
        active: pathName === "/plans",
        href: "/plans",
      },
      {
        icon: FaUserShield,
        label: "Referrals",
        active: pathName === "/referrals",
        href: "/referrals",
      },
      {
        icon: TbBinaryTree,
        label: "Tree",
        active: pathName === "/tree",
        href: "/tree",
      },
      {
        icon: RiLuggageDepositFill,
        label: "Deposit",
        active: pathName === "/deposit",
        href: "/deposit",
      },
      {
        icon: BiMoneyWithdraw,
        label: "Withdrawal",
        active: pathName === "/withdraw",
        href: "/withdraw",
      },
    ],
    [pathName]
  );

  return (
    <div className="hidden md:flex  flex-col gap-y-2 border rounded-br-3xl rounded-tr-3xl w-[220px] px-3 py-6 h-screen bg-card shadow-lg">
      <h1 className="text-3xl font-bold mb-8 px-3">Jefox</h1>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          active={route.active}
          href={route.href}
          onClick={() => router.push(route.href)}
        />
      ))}
    </div>
  );
}

export default Sidebar;
