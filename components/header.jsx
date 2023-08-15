import { getServerSession } from "next-auth";
import NavButtons from "./nav-buttons";
import { authOptions } from "@/lib/auth";
import { Button } from "./ui/button";
import Nav from "./nav";
import { FiMenu } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="container px-4 py-2 flex items-center h-16 justify-between">
      <div className="flex items-center md:hidden">
        <div className="flex md:hidden space-x-4">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon" asChild className="h-6 w-6">
                <FiMenu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[220px] p-4">
              <Nav session={session} />
            </SheetContent>
          </Sheet>
        </div>
        <Link href="/">
          <h1 className="text-3xl font-bold my-4 px-3 text-primary">Jefox</h1>
        </Link>
      </div>
      <Link href="/">
        <h1 className="text-3xl font-bold my-4 px-3 text-primary hidden md:block">
          Jefox
        </h1>
      </Link>
      <NavButtons session={session} />
    </header>
  );
}

export default Header;
