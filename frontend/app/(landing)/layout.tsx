import LandingNavbar from "@/components/Landing/LandingNavbar";
import { ThemeProvider } from "next-themes";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LandingNavbar />
        {children}
      </ThemeProvider>
    </main>
  );
};

export default LandingLayout;
