import React from "react";
import { cn } from "@/lib/utils";

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <div
      className={cn(
        "w-full flex h-9 items-center rounded-sm p-2 text-sm cursor-pointer transition-colors duration-200 ease-in-out",
        active ? "bg-primary text-white" : "hover:bg-secondary"
      )}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span className="ml-2 text-[14px]">{label}</span>
    </div>
  );
}

export default SidebarItem;
