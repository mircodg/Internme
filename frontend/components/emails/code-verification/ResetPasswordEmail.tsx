import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  resetToken?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000/password/reset";

export const ResetPasswordEmail = ({ resetToken }: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Your password reset link</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Reset link</Heading>
        <Section style={buttonContainer}>
          <Button style={button} href={`${baseUrl}/${resetToken}`}>
            Reset password
          </Button>
        </Section>
        <Text style={paragraph}>
          If you didn&apos;t request a password reset, you can safely ignore
          this.
        </Text>
        <Text style={paragraph} className="mt-1">
          If you have trouble clicking the button, copy and paste the URL below
          into your web browser: <br />
          <Link
            href={`${baseUrl}/${resetToken}`}
            className="mt-1"
          >{`${baseUrl}/${resetToken}`}</Link>
        </Text>
        <Hr style={hr} />
        <Link href="http://localhost:3000" style={reportLink}>
          internMe
        </Link>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordEmail;

// const logo = {
//   borderRadius: 21,
//   width: 42,
//   height: 42,
// };

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

// const code = {
//   fontFamily: "monospace",
//   fontWeight: "700",
//   padding: "1px 4px",
//   backgroundColor: "#dfe1e4",
//   letterSpacing: "-0.3px",
//   fontSize: "21px",
//   borderRadius: "4px",
//   color: "#3c4149",
// };
