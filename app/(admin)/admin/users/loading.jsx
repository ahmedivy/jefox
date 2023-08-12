import LoadingTable from "@/components/loading/ld-table";

async function Page() {
  return (
    <main className="p-4 w-full">
      <h1 className="text-2xl font-bold pl-2">Users</h1>
      <LoadingTable className="w-full" rows={20} />
    </main>
  );
}

export default Page;
