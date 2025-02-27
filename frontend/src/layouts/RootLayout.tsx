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
        <main className="bg-emerald-200 w-full">
          <div className="absolute bottom-2 right-2 bg-emerald-500 rounded-full p-1">
            <SidebarTrigger className="hover:bg-transparent"/>
          </div>
          <Outlet/> 
        </main>
      </SidebarProvider>
    );
};

export default RootLayout;
