import LoginCard from "@/components/login-card";

function Page() {
  return (
    <div className="container py-24">
      <div className="flex flex-col items-center gap-y-6">
        <h1 className="text-4xl font-bold">Jefox</h1>
        <LoginCard />
      </div>
    </div>
  );
}

export default Page;