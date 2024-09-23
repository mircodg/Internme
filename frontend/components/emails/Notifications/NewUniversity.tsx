import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const NewUniversityEmail = () => (
  <Html>
    <Head />
    <Preview>New University aboard</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>
          A new university just joined in the platform
        </Heading>
        <Section style={buttonContainer}>
          <Text style={paragraph}>
            A new university is available for a potential convenction. Login now
            with the button below.
          </Text>
          <Button style={button} href={`http://localhost:3000/auth/login`}>
            Login
          </Button>
        </Section>
        <Hr style={hr} />
        <Link href="http://localhost:3000" style={reportLink}>
          internMe
        </Link>
      </Container>
    </Body>
  </Html>
);

export default NewUniversityEmail;

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
