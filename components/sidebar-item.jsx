import React from "react";
import { cn } from "@/lib/utils";

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <div
      className={cn(
        "w-full flex h-12 items-center rounded-lg p-2 font-semibold cursor-pointer",
        active ? "bg-primary text-white" : "hover:bg-secondary"
      )}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" />
      <span className="ml-2">{label}</span>
    </div>
  );
}

export default SidebarItem;
