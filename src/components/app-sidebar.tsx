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
import { CircleGauge, User2, ClipboardMinus , UserRoundCog, Megaphone, CalendarCog, Siren, Ship, Bell } from "lucide-react";
import { SidebarHeader } from '@/components/ui/sidebar';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router';
import { NavLink } from 'react-router-dom';
import Navuser from "@/components/navuser/Navuser";
import { useEffect, useState } from "react";

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


const adminItems : SidebarLink[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: CircleGauge,
    active: true,
  },
  {
    title: "Users",
    url: "/users",
    icon: User2,
    active: false,
  },
  {
    title: "Roles",
    url: "/roles",
    icon: UserRoundCog,
    active: false,
  },
  {
    title: "Policies",
    url: "/policies",
    icon: Siren,
    active: false,
  },
  {
    title: "Events",
    url: "/events",
    icon: CalendarCog,
    active: false,
  },
  {
    title: "Announcements",
    url: "/announcements",
    icon: Megaphone,
    active: false,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ClipboardMinus,
    active: false,
  },
]

const userItems : SidebarLink[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: CircleGauge,
    active: true,
  },
  {
    title: "Leaves",
    url: "/leaves",
    icon: Ship,
    active: false,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    active: false,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ClipboardMinus,
    active: false,
  }
  
]

export const AppSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("role");
  const [items, setItems] = useState<SidebarLink[]>([]);


  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navMenus = userData?.role === 'admin' ? adminItems : userItems;
    setItems(navMenus);
  },[]);

  
  return (
    <Sidebar collapsible="icon" className="">
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
                          tooltip={item.title}
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