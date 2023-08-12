import { capitalize, timeSince } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ConfirmWithdrawAdmin from "@/components/confirm-withdraw-admin";

async function getData(id) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/transactions/withdraw/${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.transaction;
}

async function Page({ params }) {
  const id = params.id;

  const transaction = await getData(id);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Transaction Details</h1>

      <Table className="w-full lg:w-1/2 my-4">
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Username</TableCell>
            <TableCell>{`@${transaction.user.username}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Status</TableCell>
            <TableCell>{`${capitalize(transaction.status)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Method</TableCell>
            <TableCell>{`${capitalize(transaction.method)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Account Name</TableCell>
            <TableCell>{transaction.account}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Account Number</TableCell>
            <TableCell>{transaction.accountNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Amount ($)</TableCell>
            <TableCell>{`$ ${transaction.amount}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Amount (PKR)</TableCell>
            <TableCell>{`PKR ${transaction.amount * 180}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Time</TableCell>
            <TableCell>{`${timeSince(transaction.createdAt)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <ConfirmWithdrawAdmin id={id} />
    </main>
  );
}

export default Page;
