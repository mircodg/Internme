import LoginForm from "@/components/auth-components/LoginForm";
import LoginTypeform from "@/components/auth-components/LoginTypeform";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const LoginPage = () => {
  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52 antialiased">
      {/* <LoginForm /> */}
      <LoginTypeform />
    </MaxWidthWrapper>
  );
};

export default LoginPage;
