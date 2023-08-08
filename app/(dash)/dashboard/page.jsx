"use client";

import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  return (
    <div>
      <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
    </div>
  );
}

export default Page;
