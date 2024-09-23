"use server";

import { Resend } from "resend";
import axios from "axios";
import { NewUniversityEmail } from "@/components/emails/Notifications/NewUniversity";

const resend = new Resend(
  process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY : ""
);

// fetch ceos from the database
async function fetchCeoEmails() {
  try {
    const response = await axios.get(
      "http://backend:8000/api/company/ceo/emails",
      { withCredentials: true }
    );
    const emails = response.data.emails;
    const recipients: string[] = [];
    emails.forEach((element: any) => recipients.push(element.Email));
    return recipients;
  } catch (error: any) {
    return error;
  }
}

export async function POST() {
  try {
    const recipients = await fetchCeoEmails();
    if (recipients.length > 0) {
      const { data, error } = await resend.emails.send({
        from: "internMe <no-reply@support.internme.site>",
        to: recipients,
        subject: "New University in the platform",
        react: NewUniversityEmail(),
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
