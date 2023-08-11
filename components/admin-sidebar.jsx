import AdminNav from "./admin-nav";

function AdminSidebar() {
  return (
    <div className="hidden md:flex  flex-col gap-y-2 border w-[290px] px-3 py-6 h-screen">
      <AdminNav />
    </div>
  );
}

export default AdminSidebar;
