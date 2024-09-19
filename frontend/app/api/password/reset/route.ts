"use server";
import { ResetPasswordEmail } from "@/components/emails/code-verification/ResetPasswordEmail";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import axios from "axios";

const resend = new Resend(
  process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY : ""
);

// create a record in the database with the token
const registerToken = async (token: string, email: string) => {
  try {
    const response = await axios.post(
      "http://backend:8000/api/password/reset",
      { Token: token, Email: email }
    );
    if (response.status === 201) return true;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Response error:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // No response was received
      console.error("No response received:", error.request);
    } else {
      // Error setting up the request
      console.error("Error setting up request:", error.message);
    }
    return error;
  }
};

export async function POST(req: Request) {
  try {
    // generate a token
    const token = randomBytes(8).toString("hex");
    const { email } = await req.json();
    const isTokenAdded = await registerToken(token, email);
    if (isTokenAdded !== true) {
      return Response.json(isTokenAdded.response.data, {
        status: isTokenAdded.response.status,
      });
    }
    const { data, error } = await resend.emails.send({
      from: "internMe Support <no-reply@support.internme.site>",
      to: [`${email}`],
      subject: "Password reset",
      react: ResetPasswordEmail({ resetToken: token }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
