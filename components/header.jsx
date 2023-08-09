import { getServerSession } from "next-auth";
import NavButtons from "./nav-buttons";
import { authOptions } from "@/lib/auth";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="container flex items-center h-16 justify-between">
      <h1 className="text-3xl font-bold">Jefox</h1>

      <NavButtons session={session} />
    </header>
  );
}

export default Header;
