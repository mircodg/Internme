import CustomDashboardNavbar from "@/components/dash-components/dash-nav";
import { ThemeProvider } from "@/components/theme-provider";

interface studentDashLayoutProps {
  children: React.ReactNode;
}

const StudenDashLayout = ({ children }: studentDashLayoutProps) => {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CustomDashboardNavbar role="student">{children}</CustomDashboardNavbar>
      </ThemeProvider>
    </main>
  );
};

export default StudenDashLayout;
