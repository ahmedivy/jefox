import { Skeleton } from "@/components/ui/skeleton";

async function Page() {
  return (
    <main className="p-4 flex flex-col gap-5 items-center w-full md:w-[500px] justify-center mx-auto">
      <Skeleton className="w-[400px] h-6" />
      <p className="text-muted-foreground text-md wrap text-center">
        <Skeleton className="w-[400px] h-6" />
      </p>
      <h1 className="text-xl font-bold pl-2">Account Details</h1>
      <div className="text-md pl-2 text-center flex flex-col gap-2 font-semibold">
        <p>
          <Skeleton className="w-[200px] h-6" />
        </p>
        <p>
          <Skeleton className="w-[200px] h-6" />
        </p>
      </div>
      <p className="text-muted-foreground text-md wrap text-center">
        <Skeleton className="w-[400px] h-6" />
      </p>
    </main>
  );
}

export default Page;
