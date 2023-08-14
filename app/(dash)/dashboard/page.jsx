import { redirect } from "next/navigation";
import { LuDollarSign } from "react-icons/lu";
import { BsCreditCardFill } from "react-icons/bs";
import { AiOutlineUserSwitch, AiFillBank } from "react-icons/ai";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DashCard from "@/components/dash-card";

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
        <DashCard
          title="Total Balance"
          icon={<LuDollarSign />}
          value={`$ ${Math.round(user.balance, 2)}`}
          subValue={`${Math.round(user.balance * 180, 2)} Rs`}
        />
        <DashCard
          title="Referrals"
          icon={<AiOutlineUserSwitch />}
          value={`${user.leftReferrals + user.rightReferrals} Users`}
          subValue={`${user.leftReferrals} Left, ${user.rightReferrals} Right`}
        />
        <DashCard
          title="Total Deposited"
          icon={<AiFillBank />}
          value={`$ ${user.deposited}`}
          subValue={`${user.deposited * 180} Rs`}
        />
        <DashCard
          title="Total Withdrawn"
          icon={<BsCreditCardFill />}
          value={`$ ${user.withdrawn}`}
          subValue={`${user.withdrawn * 180} Rs`}
        />
      </div>
    </main>
  );
}

export default Page;
