import UpdateCard from "@/components/update-card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function getUser(username) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${username}`);
  const data = await res.json();

  if (data.error) {
    redirect("/login");
  }

  return data.user;
}

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await getUser(session.user.username);

  return (
    <div className="container py-24">
      <div className="flex flex-col items-center gap-y-6">
        <UpdateCard user={user} />
      </div>
    </div>
  );
}

export default Page;
