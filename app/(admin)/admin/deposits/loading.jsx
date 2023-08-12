import LoadingTable from "@/components/loading/ld-table";

async function Page() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Pending Deposits</h1>
      <LoadingTable />
      <h1 className="text-2xl font-bold pl-2">Completed Deposits</h1>
      <LoadingTable />
    </main>
  );
}

export default Page;
