import RegisterForm from "@/components/auth-components/RegisterForm";
import RegisterTypeform from "@/components/auth-components/RegisterTypeform";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const LoginPage = () => {
  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-15 lg:pb-52 antialiased">
      {/* <RegisterForm /> */}
      <RegisterTypeform />
    </MaxWidthWrapper>
  );
};

export default LoginPage;
