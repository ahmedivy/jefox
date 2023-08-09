import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { PlanCard } from "@/components/plan-card";

async function getPlans() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/plans`);
  const data = await res.json();
  return data.plans;
}

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const plans = await getPlans();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Plans</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4 pt-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            name={plan.name}
            price={plan.price}
            treeCommission={plan.treeCommission}
            referralCommission={plan.referralCommission}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;
