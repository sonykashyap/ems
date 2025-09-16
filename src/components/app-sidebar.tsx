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
  SidebarRail
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings, CircleGauge, ChevronUp, User2, ClipboardMinus , UserPlus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "./ui/dropdown-menu";
import { SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router';
import { NavLink } from 'react-router-dom';
import Navuser from "@/components/navuser/Navuser";

type SidebarLink = {
  title: string,
  url: string,
  icon: any,
  active: boolean
}

type subLinks = {
  title: string,
  url: string,
  icon: any
}


const items : SidebarLink[] = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: CircleGauge,
      active: true,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: User2,
      active: false,
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: ClipboardMinus,
      active: false,
    },
]

export const AppSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("role");

  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <span className="font-bold text-purple-700">EMS</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavLink key={item.url} to={item.url}>
                      {({ isActive }) => (
                        
                        <SidebarMenuButton
                          className={
                            `flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-violet-500 hover:text-white ${isActive
                              ? 'bg-violet-500 text-white'
                              : 'text-gray-700 hover:bg-violet-500 hover:text-white'
                            }
                          `}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                  ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-violet-500">
          <Navuser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}