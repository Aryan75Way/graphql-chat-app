import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const RootLayout = () => {
  const isAuthenticated = true;
  const navigation = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation("/login");
    }
  }, [isAuthenticated]);

  if (isAuthenticated)
    return (
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet/>
        </main>
      </SidebarProvider>
    );
};

export default RootLayout;
