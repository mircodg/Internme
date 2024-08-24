import CustomDashboardNavbar from "@/components/dash-components/dash-nav";
import { ThemeProvider } from "@/components/theme-provider";

interface DirectorDashLayoutProps {
  children: React.ReactNode;
}

const DirectorDashLayout = ({ children }: DirectorDashLayoutProps) => {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CustomDashboardNavbar role="director">
          {children}
        </CustomDashboardNavbar>
      </ThemeProvider>
    </main>
  );
};

export default DirectorDashLayout;
