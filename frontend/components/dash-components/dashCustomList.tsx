import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

type studentData = {
  StudentID: number;
  Name: string;
  Surname: string;
};

type convention = {
  CompanyName: string;
  CompanyVatNuber: number;
  Status: "Active" | "Pending" | "Rejected" | "Expired";
};

interface DashCustomListProps {
  title: string;
  description: string;
  type: "students" | "conventions";
  firstColumn: string;
  secondColumn: string;
  thirdColumn: string;
  fourthColumn?: string;
  fifthColumn?: string;
  actions: boolean;
  data: studentData[] | convention[];
}

function DashCustomList({
  title,
  description,
  type,
  firstColumn,
  secondColumn,
  thirdColumn,
  fourthColumn,
  fifthColumn,
  actions,
  data,
}: DashCustomListProps) {
  const handleApprove = async (companyVatNumber: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/university/convention/accept/${companyVatNumber}`,
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (companyVatNumber: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/university/convention/decline/${companyVatNumber}`,
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className=" my-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{firstColumn}</TableHead>
            <TableHead>{secondColumn}</TableHead>
            <TableHead className="hidden md:table-cell">
              {thirdColumn}
            </TableHead>
            {fourthColumn && (
              <TableHead className="hidden md:table-cell">
                {fourthColumn}
              </TableHead>
            )}
            {fifthColumn && (
              <TableHead className="hidden md:table-cell">
                {fifthColumn}
              </TableHead>
            )}
            {actions && (
              <TableHead className="hidden md:table-cell">
                <span>Actions</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            type === "students" &&
            (data as studentData[]).map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.StudentID}</TableCell>
                <TableCell>{student.Name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {student.Surname}
                </TableCell>
              </TableRow>
            ))}
          {data.length > 0 &&
            type === "conventions" &&
            (data as convention[]).map((convenction, index) => (
              <TableRow key={index}>
                <TableCell>{convenction.CompanyName}</TableCell>
                <TableCell>{convenction.CompanyVatNuber}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={"outline"}
                    className={
                      convenction.Status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : convenction.Status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
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
            ))}
          {data.length === 0 && type === "students" && (
            <TableRow>
              <TableCell colSpan={3}>No students found</TableCell>
            </TableRow>
          )}
          {data.length === 0 && type === "conventions" && (
            <TableRow>
              <TableCell colSpan={4}>No conventions found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

export default DashCustomList;
