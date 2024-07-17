import RegisterForm from "@/auth/RegisterForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const LoginPage = () => {
  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-15 lg:pb-52 antialiased">
      <RegisterForm />
    </MaxWidthWrapper>
  );
};

export default LoginPage;
