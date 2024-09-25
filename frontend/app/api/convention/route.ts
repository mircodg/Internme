"use server";

import { Resend } from "resend";
import axios from "axios";
import { NewConvenctionEmail } from "@/components/emails/Notifications/NewConvenction";

const resend = new Resend(
  process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY : ""
);

// fetch interested students emails the database
async function fetchDirectorEmail(nomeUniversita: any) {
  try {
    const response = await axios.get(
      `http://backend:8000/api/director/email/${nomeUniversita}`
    );
    const email = response.data.director.Email;
    console.log("email: " + email);
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
    const { nomeUniversita } = await req.json();
    const recipient = await fetchDirectorEmail(nomeUniversita); // need to implement on the internship fe and test it.
    if (recipient) {
      const { data, error } = await resend.emails.send({
        from: "internMe <no-reply@support.internme.site>",
        to: recipient,
        subject: "New Convention Request",
        react: NewConvenctionEmail(),
      });
      if (error) {
        console.log("error" + error);
        return Response.json({ error }, { status: 500 });
      }
      console.log("data " + data);
      return Response.json(data);
    }

    return Response.json({ message: "No email found" }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
