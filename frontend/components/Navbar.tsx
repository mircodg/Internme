// import { cookies } from "next/headers";
// import LandingNavbar from "./Landing/LandingNavbar";
// import axios from "axios";

// const Navbar = async () => {
//   if (cookies().get("jwt")) {
//     try {
//       let response = await axios.get("http://localhost:8000/api/user", {
//         withCredentials: true,
//       });
//       var userRole = response.data.user.tipoUtente;
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return (
//     <div>
//       {cookies().get("jwt") ? (
//         <LandingNavbar isAuthenticated={true} role={`${userRole}`} />
//       ) : (
//         <LandingNavbar isAuthenticated={false} />
//       )}
//     </div>
//   );
// };

// export default Navbar;
"use client";
import LandingNavbar from "./Landing/LandingNavbar";
import axios from "axios";
import { useEffect, useState } from "react";

type userTypes = "student" | "director" | "ceo";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<userTypes>();
  const [isLoading, setIsLoading] = useState(true);

  const checkCookie = async () => {
    try {
      let response = await axios.get("http://localhost:8000/api/user", {
        withCredentials: true,
      });
      if (response) {
        return response.data.user.TipoUtente;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let jwt = await checkCookie();
      if (jwt) {
        setIsAuthenticated(true);
        setIsLoading(false);
        jwt === "Studente"
          ? setRole("student")
          : jwt === "Direttore"
          ? setRole("director")
          : setRole("ceo");
      }
    };

    fetchData();
  });

  return !isLoading ? (
    <LandingNavbar isAuthenticated={isAuthenticated} role={role} />
  ) : (
    <LandingNavbar isAuthenticated={isAuthenticated} role={role} />
  );
};

export default Navbar;
