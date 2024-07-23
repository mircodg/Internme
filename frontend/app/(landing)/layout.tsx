import LandingNavbar from "@/components/Landing/LandingNavbar";
import { ThemeProvider } from "next-themes";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LandingNavbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default LandingLayout;
