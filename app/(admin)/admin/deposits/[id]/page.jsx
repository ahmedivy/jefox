import LoadingTable from "@/components/loading/ld-table";

async function Page() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Transaction Details</h1>

      <LoadingTable cells={2} />
    </main>
  );
}

export default Page;
