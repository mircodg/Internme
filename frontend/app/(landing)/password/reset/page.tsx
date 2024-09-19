import React from "react";
import RequestResetForm from "./_components/RequestResetForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

function RequestResetPasswordPage() {
  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52 antialiased">
      <RequestResetForm />
    </MaxWidthWrapper>
  );
}

export default RequestResetPasswordPage;
