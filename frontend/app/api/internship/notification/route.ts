"use server";

import { Resend } from "resend";
import axios from "axios";
import { NewInternshipEmail } from "@/components/emails/Notifications/NewInternship";

const resend = new Resend(
  process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY : ""
);

// fetch interested students emails the database
async function fetchStudentsEmails(idAzienda: string) {
  try {
    const response = await axios.get(
      `http://backend:8000/api/internship/notification/${idAzienda}`
    );
    const emails = response.data.emails;
    const recipients: string[] = [];
    emails.forEach((element: any) => recipients.push(element.Email));
    return recipients;
  } catch (error: any) {
    return error;
  }
}

export async function POST(req: Request) {
  try {
    const { idAzienda } = await req.json();
    const recipients = await fetchStudentsEmails(idAzienda); // need to implement on the internship fe and test it.
    if (recipients.length > 0) {
      const { data, error } = await resend.emails.send({
        from: "internMe <no-reply@support.internme.site>",
        to: recipients,
        subject: "New internship",
        react: NewInternshipEmail(),
      });
      if (error) {
        console.log("error" + error);
        return Response.json({ error }, { status: 500 });
      }
      console.log("data " + data);
      return Response.json(data);
    }
    console.log("No recipients");
    return Response.json(
      { message: "No ceos in the platform" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
