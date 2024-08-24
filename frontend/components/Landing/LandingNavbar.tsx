import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ToggleTheme";

interface LandingNavbarProps {
  isAuthenticated: boolean;
  role?: string;
}

const LandingNavbar = ({ isAuthenticated, role }: LandingNavbarProps) => {
  return (
    <nav className="h-14 flex justify-between w-full px-2.5 md:px-20 max-w-screen-2xl items-center mx-auto">
      <Link href="/">
        <p className="text-balance text-center font-bold">internMe</p>
      </Link>
      <div className="flex gap-4 items-center justify-center">
        {!isAuthenticated ? (
          <>
            <Link href="/auth/login" className=" hidden md:block">
              <Button variant={"outline"} size={"sm"} className="font-bold">
                Login
              </Button>
            </Link>
            <Link href="/auth/register" className=" hidden md:block">
              <Button variant={"outline"} size={"sm"} className="font-bold">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <Link href={`/dashboard/${role}`} className=" hidden md:block">
            <Button variant={"outline"} size={"sm"} className="font-bold">
              Dashboard
            </Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default LandingNavbar;
