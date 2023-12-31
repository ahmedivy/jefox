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
import Link from "next/link";

function DashNav() {
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
        active: pathName.startsWith("/deposit"),
        href: "/deposit",
      },
      {
        icon: BiMoneyWithdraw,
        label: "Withdrawal",
        active: pathName.startsWith("/withdraw"),
        href: "/withdraw",
      },
    ],
    [pathName]
  );

  return (
    <nav>
      <Link href="/">
        <h1 className="text-3xl font-bold mb-8 px-3 text-primary">
          Jefox
          <span className=" text-sm text-foreground italic"> MARKETING</span>
        </h1>
      </Link>
      <div className="flex flex-col space-y-2">
        {routes.map((route) => (
          <Link href={route.href} key={route.href}>
            <SidebarItem
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

export default DashNav;
