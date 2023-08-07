import NavButtons from "./nav-buttons"

function Header() {
  return (
    <header className="container flex items-center h-16 justify-between">
      <h1 className="text-3xl font-bold">Jefox</h1>

      <NavButtons />
    </header>
  )
}

export default Header
