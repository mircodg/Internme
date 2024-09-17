"use client";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import axios from "axios";
import SettingsWrapper from "./settingsWrapper";
import CeoSettingsContent from "./ceoSettingsContent";
import DirectorSettingsContent from "./directorSettingsContent";
import StudentSettingsContent from "./studentSettingsContent";

export type Address = {
  Via: string;
  NumeroCivico: number;
  CAP: number;
  Citta: string;
  Provincia: string;
};

export type userInfo = {
  UserName: string;
  UserSurname: string;
  UserEmail: string;
  UserBirthDate: string;
  TipoUtente: "Ceo" | "Director" | "Student";
  Address: Address | null;
};

function Settings() {
  const [user, setUser] = useState<userInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<string>();

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/data", {
        withCredentials: true,
      });
      if (response.status === 200) {
        if (response.data.address === null) {
          const utente: userInfo = {
            UserName: response.data.user.Nome,
            UserSurname: response.data.user.Cognome,
            UserEmail: response.data.user.Email,
            UserBirthDate: response.data.user.DataNascita,
            TipoUtente: response.data.user.TipoUtente,
            Address: null,
          };
          setUser(utente);
          setMode(response.data.user.TipoUtente);
        } else {
          const utente: userInfo = {
            UserName: response.data.user.Nome,
            UserSurname: response.data.user.Cognome,
            UserEmail: response.data.user.Email,
            UserBirthDate: response.data.user.DataNascita,
            TipoUtente: response.data.user.TipoUtente,
            Address: {
              Via: response.data.address.Via,
              NumeroCivico: response.data.address.NumeroCivico,
              CAP: response.data.address.CAP,
              Citta: response.data.address.Citta,
              Provincia: response.data.address.Provincia,
            },
          };
          setUser(utente);
          setMode(response.data.user.TipoUtente);
        }
        // toast({
        //   description: response.data.message,
        // });
        setLoading(false);
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SettingsWrapper user={user}>
          {mode === "Ceo" ? (
            <CeoSettingsContent />
          ) : mode === "Direttore" ? (
            <DirectorSettingsContent />
          ) : (
            <StudentSettingsContent />
          )}
        </SettingsWrapper>
      )}
    </>
  );
}

export default Settings;
