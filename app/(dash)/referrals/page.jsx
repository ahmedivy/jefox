import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import DashCard from "@/components/dash-card";
import ShareButtons from "@/components/share-buttons";

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
      <DashCard
        title="Total Referrals"
        value={`${referrals.lefts.length + referrals.rights.length} Users`}
        subValue="Users that joined through your referral link"
        className="w-full md:w-1/2 lg:w-1/4 mt-7"
      />
      <h1 className="text-2xl font-bold pl-2 my-4">Share Links</h1>
      <ShareButtons username={session.user.username} />
    </main>
  );
}

export default Page;
