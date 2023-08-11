"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

function AdminCard({
  icon,
  title,
  value,
  subValue,
  href,
  button,
  className = "",
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subValue}</p>
        <div className="flex items-end w-full justify-end pt-3">
          <Button asChild>
            <Link href={href}>{button}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminCard;
