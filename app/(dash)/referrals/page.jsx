import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

async function getReferrals(username) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${username}/referrals`
  );
  const data = await res.json();
  return data;
}

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const referrals = await getReferrals(session.user.username);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Referrals</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4 pt-8"></div>
    </main>
  );
}

export default Page;
