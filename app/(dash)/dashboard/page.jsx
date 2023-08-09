import { redirect } from "next/navigation";
import { LuDollarSign } from "react-icons/lu";
import { BsCreditCardFill } from "react-icons/bs";
import { AiOutlineUserSwitch, AiFillBank } from "react-icons/ai";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${session.user.username}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  const data = await res.json();
  const user = data.user;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <LuDollarSign />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ {`${user.balance}`}</div>
            <p className="text-xs text-muted-foreground">
              {user.balance * 180} Rs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <AiOutlineUserSwitch />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {`${user.leftReferrals + user.rightReferrals}`} Users
            </div>
            <p className="text-xs text-muted-foreground">
              {user.leftReferrals} Left, {user.rightReferrals} Right
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposited
            </CardTitle>
            <AiFillBank />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ {user.deposited}</div>
            <p className="text-xs text-muted-foreground">
              {user.deposited * 180} Rs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawn
            </CardTitle>
            <BsCreditCardFill />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$ {user.withdrawn}</div>
            <p className="text-xs text-muted-foreground">{user.withdrawn} Rs</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default Page;
