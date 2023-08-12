import AdminCard from "@/components/loading/ld-admin-card";

async function Page() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold pl-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-8">
        <AdminCard />
        <AdminCard />
        <AdminCard />
      </div>
    </main>
  );
}

export default Page;
