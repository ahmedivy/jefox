import { LoadingBankCard } from "@/components/loading/ld-bank-card";
import LoadingTable from "@/components/loading/ld-table";

async function Page() {
  return (
    <main className="p-4 flex flex-col gap-5">
      <h1 className="text-2xl font-bold pl-2">Deposit</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4 pt-4">
        <LoadingBankCard />
        <LoadingBankCard />
      </div>
      <h1 className="text-2xl font-bold pl-2">History</h1>
      <LoadingTable />
    </main>
  );
}

export default Page;
