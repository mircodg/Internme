import React from "react";
import ResetPasswordForm from "./_components/ResetPasswordForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FormWrapper from "@/components/FormWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const validateToken = async (token: string) => {
  try {
    const response = await axios.get(
      `http://backend:8000/api/check/token/${token}`
    );
    const data = await response.data;
    return data.isValid;
  } catch (error) {
    console.log(error);
    return false;
  }
};

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = params;
  const isValidToken = await validateToken(token);

  return (
    <>
      {isValidToken ? (
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52 antialiased">
          <ResetPasswordForm token={token} />
        </MaxWidthWrapper>
      ) : (
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52 antialiased">
          <FormWrapper
            title="Invalid token"
            label="The token is invalid or expired"
          >
            <Button>
              <Link href="/password/reset">Request new link</Link>
            </Button>
          </FormWrapper>
        </MaxWidthWrapper>
      )}
    </>
  );
}
