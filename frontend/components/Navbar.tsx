import Link from "next/link";
import { ModeToggle } from "./ToggleTheme";

const Navbar = () => {
  return (
    <nav className="h-14 flex justify-between w-full px-2.5 md:px-20 max-w-screen-2xl items-center mx-auto">
      <Link href="/">
        <p className="text-balance text-center font-bold">internMe</p>
      </Link>
      <div className="flex gap-4 items-center justify-center">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
