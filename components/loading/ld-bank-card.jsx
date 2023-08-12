import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function LoadingBankCard({}) {
  return (
    <Card className={"py-10 md:px-3 px-1"}>
      <CardContent className="flex flex-col space-y-5">
        <div className="flex flex-col items-center justify-center p-6">
          <Skeleton className="w-16 h-16 rounded-lg" />
        </div>
        <Skeleton className="w-1/2 h-6" />
        <div className="flex flex-col gap-2 items-center py-4">
          <Skeleton className="w-full h-4 p-3" />
          <Skeleton className="w-full h-4 p-3" />
          <Skeleton className="w-full h-4 p-3" />
        </div>
        <Skeleton className="w-full h-8 pt-3" />
      </CardContent>
    </Card>
  );
}

export { LoadingBankCard };
