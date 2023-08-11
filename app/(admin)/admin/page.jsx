import { FaUsers } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { RiBankFill } from "react-icons/ri";

import AdminCard from "@/components/admin-card";

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/admin`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

async function Page() {
  const data = await getData();
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-8">
        <AdminCard
          title="Total Users"
          icon={<FaUsers />}
          value={data.usersCount}
          subValue={"Currently Active Users"}
          button="View Users"
          href={"/admin/users"}
        />
        <AdminCard
          title="Pending Withdrawals"
          icon={<BsCreditCardFill />}
          value={`${data.withdrawRequestsCount}`}
          subValue={`Withdraw requests pending for approvals`}
          button="View Withdrawals"
          href={"/admin/withdrawals"}
        />
        <AdminCard
          title="Pending Deposits"
          icon={<RiBankFill />}
          value={`${data.depositRequestsCount}`}
          subValue={`Deposits pending for approvals`}
          button="View Deposits"
          href={"/admin/deposits"}
        />
      </div>
    </main>
  );
}

export default Page;
