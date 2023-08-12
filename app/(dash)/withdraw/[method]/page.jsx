import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { capitalize } from "@/lib/utils";
import WithdrawForm from "@/components/withdraw-form";

async function getBalance(username) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${username}/balance`
  );
  const data = await res.json();
  return data.balance;
}

async function Page({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const method = params.method;

  if (method !== "easypaisa" && method !== "jazzcash") {
    redirect("/withdraw");
  }
  const balance = await getBalance(session.user.username);

  return (
    <main className="p-4 flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold pl-2">
        Withdraw with {capitalize(method)}
      </h1>
      <p className="text-muted-foreground text-md">
        Enter the amount you want to withdraw and account details.
      </p>
      <WithdrawForm
        method={method}
        balance={balance}
        username={session.user.username}
      />
    </main>
  );
}

export default Page;
