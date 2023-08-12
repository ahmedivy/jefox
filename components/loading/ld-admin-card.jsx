import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "../ui/skeleton";

function AdminCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="w-1/2 h-4 py-3" />
        </CardTitle>
        <Skeleton className="h-6 w-[30px]" />
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Skeleton className="h-6 w-[60px]" />
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[200px]" />
        <div className="flex items-end w-full justify-end pt-3">
          <Skeleton className="w-[100px] h-6" />
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminCard;
