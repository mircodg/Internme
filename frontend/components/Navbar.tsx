import { cookies } from 'next/headers'
import LandingNavbar from "./Landing/LandingNavbar";

const Navbar = () => {

  return (
    <div>
      {cookies().get('jwt') ? <LandingNavbar isAuthenticated={true} /> : <LandingNavbar isAuthenticated={false} />}
    </div>
  );
};

export default Navbar;
