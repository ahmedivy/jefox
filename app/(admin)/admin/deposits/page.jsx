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
import { capitalize, timeSince } from "@/lib/utils";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/transactions/deposits/`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

async function Page() {
  const data = await getData();

  const pendingDeposits = data.pendingDeposits;
  const completedDeposits = data.completedDeposits;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Pending Deposits</h1>
      {pendingDeposits.length === 0 ? (
        <p className="text-muted-foreground text-center w-full lg:w-1/2 my-4">
          No Pending Deposits
        </p>
      ) : (
        <Table className="w-full lg:w-1/2 my-4">
          <TableCaption>
            A list of all Pending Deposited Transactions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Invoice</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="">Time</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingDeposits.map((deposit, index) => {
              return (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{`INV${(index + 1)
                    .toString()
                    .padStart(3, "0")}`}</TableCell>
                  <TableCell>{`@${deposit.user.username}`}</TableCell>
                  <TableCell className="text-right">{`$ ${deposit.amount}`}</TableCell>
                  <TableCell className="">
                    {timeSince(deposit.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button asChild>
                      <Link href={`/admin/deposits/${deposit.id}`}>
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

      <h1 className="text-2xl font-bold pl-2">Completed Deposits</h1>
      {completedDeposits.length === 0 ? (
        <p className="text-muted-foreground text-center w-full lg:w-1/2 my-4">
          No Completed Deposits
        </p>
      ) : (
        <Table className="w-full lg:w-1/2 my-4">
          <TableCaption>
            A list of all Completed Deposited Transactions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Invoice</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="">Time</TableHead>
              <TableHead className="">Confirmed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedDeposits.map((deposit, index) => {
              return (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{`INV${(index + 1)
                    .toString()
                    .padStart(3, "0")}`}</TableCell>
                  <TableCell>{`@${deposit.user.username}`}</TableCell>
                  <TableCell className="text-right">{`$ ${deposit.amount}`}</TableCell>
                  <TableCell className="">
                    {timeSince(deposit.createdAt)}
                  </TableCell>
                  <TableCell className="">
                    {timeSince(deposit.updatedAt)}
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
