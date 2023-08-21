import ResetCard from "@/components/reset-card";

import jwt from "jsonwebtoken";

function Page({ params }) {
  const token = params.token;

  const decoded = jwt.decode(token);

  if (!decoded) {
    return <div className="container py-24">Token expired or invalid</div>;
  }

  return (
    <div className="container py-24">
      <div className="flex flex-col items-center gap-y-6">
        <ResetCard email={decoded.email} token={token} />
      </div>
    </div>
  );
}

export default Page;
