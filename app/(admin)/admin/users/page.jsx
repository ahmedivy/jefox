import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

async function getUsers() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
  return await res.json();
}

async function Page() {
  const users = await getUsers();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Users</h1>
      <Table className="w-full my-4">
        <TableHeader>
          <TableRow>
            <TableHead className="">Username</TableHead>
            <TableHead>FirstName</TableHead>
            <TableHead className="">Last Name</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Phone</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead className="">Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {user.username === "admin" ? "Admin" : "User"}
                </TableCell>
                <TableCell>{user.country}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}

export default Page;
