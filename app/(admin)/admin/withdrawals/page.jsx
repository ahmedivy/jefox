import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { timeSince } from "@/lib/utils";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/transactions/withdraw/`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export const revalidate = 0;

async function Page() {
  const data = await getData();

  const pendingWithdrawals = data.pendingWithdrawals;
  const completedWithdrawals = data.completedWithdrawals;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Pending Withdrawals</h1>
      {pendingWithdrawals.length === 0 ? (
        <p className="text-muted-foreground text-center w-full lg:w-1/2 my-4">
          No Pending Withdrawals
        </p>
      ) : (
        <Table className="w-full lg:w-1/2 my-4">
          <TableCaption>
            A list of all Pending Withdraw Transactions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Invoice</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="">Account Name</TableHead>
              <TableHead className="">Account Number</TableHead>
              <TableHead className="">Time</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingWithdrawals.map((withdrawal, index) => {
              return (
                <TableRow key={withdrawal.id}>
                  <TableCell className="font-medium">{`INV${(index + 1)
                    .toString()
                    .padStart(3, "0")}`}</TableCell>
                  <TableCell>{`@${withdrawal.user.username}`}</TableCell>
                  <TableCell className="text-right">{`$ ${
                    Number(withdrawal.amount) - Number(withdrawal.amount) * 0.06
                  }`}</TableCell>
                  <TableCell className="">{withdrawal.account}</TableCell>
                  <TableCell className="">{withdrawal.accountNumber}</TableCell>
                  <TableCell className="">
                    {timeSince(withdrawal.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button asChild>
                      <Link href={`/admin/withdrawals/${withdrawal.id}`}>
                        Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <h1 className="text-2xl font-bold pl-2">Completed Withdrawals</h1>
      {completedWithdrawals.length === 0 ? (
        <p className="text-muted-foreground text-center w-full lg:w-1/2 my-4">
          No Completed Withdrawals
        </p>
      ) : (
        <Table className="w-full lg:w-1/2 my-4">
          <TableCaption>
            A list of all Completed Withdraw Transactions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Invoice</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="">Account</TableHead>
              <TableHead className="">Account Number</TableHead>
              <TableHead className="">Time</TableHead>
              <TableHead className="">Confirmed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedWithdrawals.map((withdrawal, index) => {
              return (
                <TableRow key={withdrawal.id}>
                  <TableCell className="font-medium">{`INV${(index + 1)
                    .toString()
                    .padStart(3, "0")}`}</TableCell>
                  <TableCell>{`@${withdrawal.user.username}`}</TableCell>
                  <TableCell className="text-right">{`$ ${
                    Number(withdrawal.amount) - Number(withdrawal.amount) * 0.06
                  }`}</TableCell>
                  <TableCell className="">{withdrawal.account}</TableCell>
                  <TableCell className="">{withdrawal.accountNumber}</TableCell>
                  <TableCell className="">
                    {timeSince(withdrawal.createdAt)}
                  </TableCell>
                  <TableCell className="">
                    {timeSince(withdrawal.updatedAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </main>
  );
}

export default Page;
