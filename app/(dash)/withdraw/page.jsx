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

async function getWithdrawals(username) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${username}/transactions/withdrawals`
  );
  const data = await res.json();

  return data.withdrawals;
}

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const withdrawals = await getWithdrawals(session.user.username);

  return (
    <main className="p-4 flex flex-col gap-5">
      <h1 className="text-2xl font-bold pl-2">Withdraws</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4 pt-4">
        <BankCard
          name="Jazz Cash"
          image="/jazzcash.png"
          href="/withdraw/jazzcash"
          type="withdraw"
        />
        <BankCard
          name="Easy Paisa"
          image="/easypaisa.png"
          href="/withdraw/easypaisa"
          type="withdraw"
        />
      </div>
      <h1 className="text-2xl font-bold pl-2">History</h1>
      <Table className="w-full lg:w-1/2">
        <TableCaption>A list of your all Withdrawal Transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Number</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal, index) => {
            return (
              <TableRow key={withdrawal.id}>
                <TableCell className="font-medium">{`INV${(index + 1)
                  .toString()
                  .padStart(3, "0")}`}</TableCell>
                <TableCell>{capitalize(withdrawal.status)}</TableCell>
                <TableCell>{capitalize(withdrawal.method)}</TableCell>
                <TableCell>{capitalize(withdrawal.account)}</TableCell>
                <TableCell>{withdrawal.accountNumber}</TableCell>
                <TableCell className="text-right">{`$ ${withdrawal.amount}`}</TableCell>
                <TableCell className="">
                  {timeSince(withdrawal.createdAt)}
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
