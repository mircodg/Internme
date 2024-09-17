"use client";
import LandingNavbar from "./Landing/LandingNavbar";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

type userTypes = "student" | "director" | "ceo";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<userTypes>();
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

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
    if (hasFetched.current) return;
    hasFetched.current = true;
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
  }, []);

  return !isLoading ? (
    <LandingNavbar isAuthenticated={isAuthenticated} role={role} />
  ) : (
    <LandingNavbar isAuthenticated={isAuthenticated} role={role} />
  );
};

export default Navbar;
