import { Skeleton } from "@/components/ui/skeleton";

async function Page() {
  return (
    <main className="p-4 flex flex-col gap-5 items-center">
      <Skeleton className="w-1/2 h-12" />
      <Skeleton className="w-1/2 h-12" />

      <Skeleton className="w-1/2 h-[64px]" />
    </main>
  );
}

export default Page;
