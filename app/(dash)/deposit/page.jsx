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
import { capitalize, timeSince } from "@/lib/utils";

async function getDeposits(username) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${username}/transactions/deposits`
  );
  const data = await res.json();

  return data.deposits;
}

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const deposits = await getDeposits(session.user.username);

  return (
    <main className="p-4 flex flex-col gap-5">
      <h1 className="text-2xl font-bold pl-2">Deposit</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4 pt-4">
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
            <TableHead className="">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deposits.map((deposit, index) => {
            return (
              <TableRow key={deposit.id}>
                <TableCell className="font-medium">{`INV${(index + 1)
                  .toString()
                  .padStart(3, "0")}`}</TableCell>
                <TableCell>{capitalize(deposit.status)}</TableCell>
                <TableCell>{capitalize(deposit.method)}</TableCell>
                <TableCell className="text-right">{`$ ${deposit.amount}`}</TableCell>
                <TableCell className="">
                  {timeSince(deposit.createdAt)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}

export default Page;
