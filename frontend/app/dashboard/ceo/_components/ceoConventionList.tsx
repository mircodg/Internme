import React from "react";
import axios from "axios";
import type { convention } from "../conventions/page";

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
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CeoConventionListProps {
  firstColumn: string;
  secondColumn: string;
  thirdColumn: string;
  data: convention[];
}

const handleRenew = async (universityName: string) => {
  try {
    const name = universityName.replace(" ", "%20");
    const response = await axios.post(
      `http://localhost:8000/api/company/convention/renew/${name}`,
      null,
      { withCredentials: true }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleRemove = async (universityName: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/company/convention/remove/${universityName}`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

function CeoConventionList({
  firstColumn,
  secondColumn,
  thirdColumn,
  data,
}: CeoConventionListProps) {
  return (
    <div>
      <Card className=" my-4">
        <CardHeader>
          <CardTitle>Conventions</CardTitle>
          <CardDescription>List of all conventions</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{firstColumn}</TableHead>
              <TableHead>{secondColumn}</TableHead>
              {thirdColumn && (
                <TableHead className="hidden md:table-cell">
                  {thirdColumn}
                </TableHead>
              )}
              <TableHead className="hidden md:table-cell">
                <span>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((convention, index) => (
              <TableRow key={index}>
                <TableCell>{convention.UniversityName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={"outline"}
                    className={
                      convention.Status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : convention.Status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
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
            ))}
            {/* {type === "students" &&
              (data as studentData[]).map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.StudentID}</TableCell>
                  <TableCell>{student.Name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {student.Surname}
                  </TableCell>
                </TableRow>
              ))}
            {type === "conventions" &&
              (data as convention[]).map((convenction, index) => (
                <TableRow key={index}>
                  <TableCell>{convenction.CompanyName}</TableCell>
                  <TableCell>{convenction.CompanyVatNuber}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={"outline"}
                      className={
                        convenction.Status === "Pending"
                          ? "bg-yellow-500"
                          : convenction.Status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {convenction.Status}
                    </Badge>
                  </TableCell>
                  {actions && convenction.Status === "Pending" && (
                    <TableCell className="hidden md:table-cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              handleApprove(convenction.CompanyVatNuber)
                            }
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleReject(convenction.CompanyVatNuber)
                            }
                          >
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default CeoConventionList;
