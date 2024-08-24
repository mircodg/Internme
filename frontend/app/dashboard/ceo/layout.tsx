import CustomDashboardNavbar from "@/components/dash-components/dash-nav";
import { ThemeProvider } from "@/components/theme-provider";

interface CeoDashLayoutProps {
  children: React.ReactNode;
}

const CeoDashLayout = ({ children }: CeoDashLayoutProps) => {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CustomDashboardNavbar role="ceo">{children}</CustomDashboardNavbar>
      </ThemeProvider>
    </main>
  );
};

export default CeoDashLayout;
