import { CircleUserRound, Home, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { logout } from "@/store/reducers/authReducer";
import { useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  const dispatch = useDispatch(); const storedUsers = localStorage.getItem("users");
  const users = storedUsers ? JSON.parse(storedUsers) : [];

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>ChatSy</SidebarGroupLabel>
          <hr />
          <SidebarGroupContent className="py-5">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"/"}>
                    <Home />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {users.map((user:string) => (
                <SidebarMenuItem key={user} className={`p-1 hover:bg-emerald-100 transition-all duration-200 ease-in-out rounded-lg ${location.pathname === `/${user}` ? "bg-emerald-100" : ""}`}>
                  <SidebarMenuButton asChild>
                    <a href={`/${user}`}>
                      <CircleUserRound size={16} />
                      <span className="font-light">{user}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SidebarMenuButton onClick={handleLogout}>
          <div className="flex items-center gap-1">
            <LogOut size={16} />
            <span>Sign out</span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
