import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { BankCard } from "@/components/bank-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-4 flex flex-col gap-5">
      <h1 className="text-2xl font-bold pl-2">Deposit</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4 pt-4">
        <BankCard
          name="Jazz Cash"
          image="/jazzcash.png"
          href="/deposit/jazzcash"
        />
        <BankCard
          name="Easy Paisa"
          image="/easypaisa.png"
          href="/deposit/easypaisa"
        />
      </div>
      <h1 className="text-2xl font-bold pl-2">History</h1>
      <Table className="w-full lg:w-1/2">
        <TableCaption>A list of your all Deposited Transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}

export default Page;
