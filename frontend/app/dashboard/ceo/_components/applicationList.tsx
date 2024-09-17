"use client";
import axios from "axios";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import FeedbackCreation from "../../student/_components/FeedbackCreation";

type companyApplicationData = {
  Matricola: string;
  NomeUniversita: string;
  idTirocinio: number;
  TitoloTirocinio: string;
  Stato: "Pending" | "Active" | "Rejected" | "Ended";
};

type studentApplicationData = {
  idTirocinio: number;
  TitoloTirocinio: string;
  NomeAzienda: string;
  Stato: "Pending" | "Active" | "Rejected" | "Ended";
};

interface ApplicationListProps {
  mode: "student" | "ceo";
}

function ApplicationList({ mode }: ApplicationListProps) {
  const [companyApplications, setCompanyApplications] = useState<
    companyApplicationData[]
  >([]);
  const [studentApplications, setStudentApplications] = useState<
    studentApplicationData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [idTirocinio, setIdTirocinio] = useState<number>(0);

  const fetchStudentApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/student/applications",
        {
          withCredentials: true,
        }
      );
      const studentApplicationsArray = response.data.applications;
      studentApplicationsArray.forEach(
        (application: studentApplicationData) => {
          const newApplication: studentApplicationData = {
            idTirocinio: application.idTirocinio,
            TitoloTirocinio: application.TitoloTirocinio,
            NomeAzienda: application.NomeAzienda,
            Stato: application.Stato,
          };
          setStudentApplications((prev) => {
            const isDuplicate = prev.some(
              (application) =>
                application.idTirocinio === newApplication.idTirocinio
            );
            if (isDuplicate) return prev;
            setLoading(false);
            return [...prev, newApplication];
          });
        }
      );
    } catch (error) {
      console.log(error);
      setStudentApplications([]);
      setLoading(false);
      return null;
    }
  };

  const fetchCompanyApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/company/applications",
        {
          withCredentials: true,
        }
      );
      const companyApplicationsArray = response.data.applications;
      companyApplicationsArray.forEach(
        (application: companyApplicationData) => {
          const newApplication: companyApplicationData = {
            Matricola: application.Matricola,
            NomeUniversita: application.NomeUniversita,
            idTirocinio: application.idTirocinio,
            TitoloTirocinio: application.TitoloTirocinio,
            Stato: application.Stato,
          };
          setCompanyApplications((prev) => {
            const isDuplicate = prev.some(
              (application) =>
                application.idTirocinio === newApplication.idTirocinio &&
                application.Matricola === newApplication.Matricola &&
                application.NomeUniversita === newApplication.NomeUniversita
            );
            if (isDuplicate) return prev;
            setLoading(false);
            return [...prev, newApplication];
          });
        }
      );
    } catch (error) {
      console.log(error);
      setCompanyApplications([]);
      setLoading(false);
      return null;
    }
  };

  const handleRemove = async (idTirocinio: number) => {
    try {
      await axios.post(
        `http://localhost:8000/api/student/applications/remove/${idTirocinio}`,
        null,
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleApprove = async (
    idTirocinio: number,
    Matricola: string,
    NomeUniversita: string
  ) => {
    // send a post request to approve the application. In the body of the request, send idTirocinio, Matricola, and NomeUniversita
    try {
      const response = await axios.post(
        "http://localhost:8000/api/company/applications/approve",
        {
          idTirocinio: idTirocinio,
          Matricola: Matricola,
          NomeUniversita: NomeUniversita,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleReject = async (
    idTirocinio: number,
    Matricola: string,
    NomeUniversita: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/company/applications/reject",
        {
          idTirocinio: idTirocinio,
          Matricola: Matricola,
          NomeUniversita: NomeUniversita,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const handleEnd = async (
    idTirocinio: number,
    Matricola: string,
    NomeUniversita: string
  ) => {
    // send a post request to end the internship. In the body of the request, send idTirocinio
    try {
      const response = await axios.post(
        "http://localhost:8000/api/company/internship/end",
        {
          idTirocinio: idTirocinio,
          Matricola: Matricola,
          NomeUniversita: NomeUniversita,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast({
          description: "Internship ended successfully",
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        description: "Error ending internship",
        variant: "destructive",
      });
      return;
    }
  };

  const handleCV = async (Matricola: string, NomeUniversita: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/company/applications/cv/${Matricola}/${NomeUniversita}`,
        { withCredentials: true, responseType: "blob" }
      );

      // Create a Blob URL for the file
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${Matricola}_${NomeUniversita}_CV.pdf`); // Set the default filename

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the DOM after the download is triggered
      link.remove();
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const handleFeedback = (idTirocinio: number) => {
    setIdTirocinio(idTirocinio);
    setShowFeedback(true);
  };

  useEffect(() => {
    if (mode === "student") {
      fetchStudentApplications();
    } else {
      fetchCompanyApplications();
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "student") {
      if (!loading) console.log(studentApplications);
    } else {
      if (!loading) console.log(companyApplications);
    }
  }, [companyApplications, studentApplications, mode, loading]);

  return (
    <div>
      {showFeedback && (
        <FeedbackCreation
          idTirocinio={idTirocinio}
          callBack={() => {
            setTimeout(() => {
              setShowFeedback(false);
            }, 100);
          }}
        />
      )}
      <Card className=" my-4">
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          {mode === "student" && (
            <CardDescription>List of all your applications</CardDescription>
          )}
          {mode === "ceo" && (
            <CardDescription>List of all conventions</CardDescription>
          )}
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              {mode !== "student" && (
                <>
                  <TableHead>Matricola</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Università
                  </TableHead>
                </>
              )}
              <TableHead className="hidden md:table-cell">Tirocinio</TableHead>
              {mode === "student" && (
                <TableHead className="hidden md:table-cell">Azienda</TableHead>
              )}
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            )}
            {!loading &&
              mode === "student" &&
              studentApplications.length !== 0 &&
              studentApplications.map((application, index) => (
                <TableRow key={index}>
                  <TableCell>{application.TitoloTirocinio}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {application.NomeAzienda}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={"outline"}
                      className={
                        application.Stato === "Pending"
                          ? "bg-yellow-500 text-white"
                          : application.Stato === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }
                    >
                      {application.Stato}
                    </Badge>
                  </TableCell>
                  {application.Stato === "Pending" && (
                    <TableCell className="hidden md:table-cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleRemove(application.idTirocinio)
                            }
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                  {application.Stato === "Ended" && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleFeedback(application.idTirocinio)
                            }
                          >
                            Leave Feedback
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {!loading &&
              mode === "ceo" &&
              companyApplications.length !== 0 &&
              companyApplications.map((application, index) => (
                <TableRow key={index}>
                  <TableCell>{application.Matricola}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {application.NomeUniversita}
                  </TableCell>
                  <TableCell>{application.TitoloTirocinio}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={"outline"}
                      className={
                        application.Stato === "Pending"
                          ? "bg-yellow-500 text-white"
                          : application.Stato === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }
                    >
                      {application.Stato}
                    </Badge>
                  </TableCell>
                  {application.Stato === "Pending" && (
                    <TableCell className="hidden md:table-cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleCV(
                                application.Matricola,
                                application.NomeUniversita
                              )
                            }
                          >
                            See CV
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleApprove(
                                application.idTirocinio,
                                application.Matricola,
                                application.NomeUniversita
                              )
                            }
                          >
                            Accept
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleReject(
                                application.idTirocinio,
                                application.Matricola,
                                application.NomeUniversita
                              )
                            }
                          >
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                  {application.Stato === "Active" && (
                    <TableCell className="hidden md:table-cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleEnd(
                                application.idTirocinio,
                                application.Matricola,
                                application.NomeUniversita
                              )
                            }
                          >
                            End Internship
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {/* {data.map((convention, index) => (
              <TableRow key={index}>
                <TableCell>{convention.UniversityName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={"outline"}
                    className={
                      convention.Status === "Pending"
                        ? "bg-yellow-500"
                        : convention.Status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  >
                    {convention.Status}
                  </Badge>
                </TableCell>
                <TableCell>{convention.date}</TableCell>
                {(convention.Status === "Expired" ||
                  convention.Status === "Rejected") && (
                  <TableCell className="hidden md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleRenew(convention.UniversityName)}
                        >
                          Renew
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
                {convention.Status === "Pending" && (
                  <TableCell className="hidden md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            handleRemove(convention.UniversityName)
                          }
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))} */}
            {!loading &&
              studentApplications.length === 0 &&
              mode === "student" && (
                <TableRow>
                  <TableCell>You have not applied to any Internship</TableCell>
                </TableRow>
              )}
            {!loading && companyApplications.length === 0 && mode === "ceo" && (
              <TableRow>
                <TableCell>
                  No students have applied to any of your Internship posts
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default ApplicationList;
