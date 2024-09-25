"use server";

import { Resend } from "resend";
import axios from "axios";
import { ApproveConventionEmail } from "@/components/emails/Notifications/ApproveConvention";

const resend = new Resend(
  process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY : ""
);

// fetch interested students emails the database
async function fetchCeoEmail(companyVatNumber: any) {
  try {
    const response = await axios.get(
      `http://backend:8000/api/ceo/email/vat/${companyVatNumber}`
    );
    const email = response.data.email;
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
    const { companyVatNumber } = await req.json();
    const recipient = await fetchCeoEmail(companyVatNumber); // need to implement on the internship fe and test it.
    if (recipient) {
      const { data, error } = await resend.emails.send({
        from: "internMe <no-reply@support.internme.site>",
        to: recipient,
        subject: "Convention Approved",
        react: ApproveConventionEmail(),
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
