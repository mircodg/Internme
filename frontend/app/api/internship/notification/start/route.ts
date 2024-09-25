"use server";

import { Resend } from "resend";
import axios from "axios";
import { StartInternshipEmail } from "@/components/emails/Notifications/StartInternship";

const resend = new Resend(
  process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY : ""
);

// fetch interested students emails the database
async function fetchStudentEmail(Matricola: string, NomeUniversita: string) {
  try {
    const response = await axios.post(
      `http://backend:8000/api/student/notification/info`,
      { NomeUniversita: NomeUniversita, Matricola: Matricola }
    );
    const email = response.data.student.Email;
    console.log("Emails: " + email);
    if (email) {
      return email;
    }
  } catch (error: any) {
    console.log("Error: " + error);
    return error;
  }
}

export async function POST(req: Request) {
  try {
    const { Matricola, NomeUniversita } = await req.json();
    const recipient = await fetchStudentEmail(Matricola, NomeUniversita);
    if (recipient) {
      const { data, error } = await resend.emails.send({
        from: "internMe <no-reply@support.internme.site>",
        to: recipient,
        subject: "Start of Internship",
        react: StartInternshipEmail(),
      });
      if (error) {
        console.log("error" + error);
        return Response.json({ error }, { status: 500 });
      }
      console.log("data " + data);
      return Response.json(data);
    }
    console.log("No recipients");
    return Response.json({ message: "No student found" }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
