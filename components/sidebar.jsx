import DashNav from "./dash-nav";

function Sidebar() {
  return (
    <div className="hidden md:flex  flex-col gap-y-2 border w-[290px] px-3 py-6 h-screen bg-gradient">
      <DashNav />
    </div>
  );
}

export default Sidebar;
