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
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { 
  CircleGauge, User2, ClipboardMinus , 
  UserRoundCog, Megaphone, CalendarCog, 
  Siren, Ship, Bell } from "lucide-react";
import { SidebarHeader } from '@/components/ui/sidebar';
// import { useDispatch } from 'react-redux';
// import {useNavigate} from 'react-router';
import { NavLink } from 'react-router-dom';
import Navuser from "@/components/navuser/Navuser";
import { useEffect, useState } from "react";

type SidebarLink = {
  title: string,
  url: string,
  icon: any,
  active: boolean,
  items?: {
      title: string
      url: string
    }[]
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
    title: "Employees",
    url: "/users",
    icon: User2,
    active: false,
    items: [
        {
          title: "Profile",
          url: "/users/profile",
        },
       
      ],
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
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const userRole = localStorage.getItem("role");
  const [items, setItems] = useState<SidebarLink[]>([]);


  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navMenus = userData?.role === 'admin' ? adminItems : userItems;
    setItems(navMenus);
  },[]);

  
  return (
  <Sidebar
    collapsible="icon"
    className="
      border-r border-slate-200
      bg-white
      transition-all duration-300
      group
    "
  >

  {/* Header */}
  <SidebarHeader className="border-b border-slate-200 px-3 py-4">

  <div className="flex items-center justify-center group-data-[collapsible=icon]:justify-center gap-3">

    {/* Logo */}
    <div className="
      flex h-14 w-14 shrink-0
      items-center justify-center
      rounded-3xl
      bg-gradient-to-br
      from-violet-600
      to-fuchsia-500
      shadow-xl
    ">
      <span className="text-2xl font-extrabold text-white">
        EMS
      </span>
    </div>

    {/* Hide Text on Collapse */}
    <div className="group-data-[collapsible=icon]:hidden">
      <h1 className="text-xl font-bold text-slate-800">
        EMS Panel
      </h1>

      <p className="text-sm text-slate-500">
        Employee Management
      </p>
    </div>

  </div>

</SidebarHeader>

  {/* Content */}
  <SidebarContent className="px-3 group-data-[collapsible=icon]:px-0 py-5 ">

    <SidebarGroup>

      <SidebarGroupContent>

        <SidebarMenu className="space-y-2">

          {items.map((item) => (

            <Collapsible key={item.url}>

              <SidebarMenuItem>

                <NavLink to={item.url}>

                  {({ isActive }) => (

                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`
                        flex items-center
                        gap-3
                        rounded-2xl
                        transition-all duration-300

                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:px-2
                        group-data-[collapsible=icon]:py-3

                        px-4 py-6

                        ${
                          isActive
                            ? `
                              bg-gradient-to-r
                              from-violet-600
                              to-fuchsia-500
                              text-white
                              shadow-lg
                            `
                            : `
                              text-slate-700
                              hover:bg-violet-50
                              hover:text-violet-700
                            `
                        }
                      `}
                    >

                      {/* Glow Effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-white/10 blur-2xl"></div>
                      )}

                      {/* Icon */}
                      <div
                        className={`
                          flex items-center justify-center
                          h-10 w-10 shrink-0 rounded-xl
                          transition-all duration-300

                          ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'text-slate-700'
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>

                      {/* Text */}
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>

                      {/* Active Dot */}
                      {isActive && (
                        <div className="absolute right-4 h-2 w-2 rounded-full bg-white shadow-md shadow-white"></div>
                      )}

                    </SidebarMenuButton>

                  )}

                </NavLink>

              </SidebarMenuItem>

              {/* Sub Menu */}
              <CollapsibleContent>

                <SidebarMenuSub className="ml-5 mt-2 border-l border-white/10 pl-4 space-y-1">

                  {item.items?.map((subItem) => (

                    <SidebarMenuSubItem key={subItem.title}>

                      <SidebarMenuSubButton
                        asChild
                        className="
                          rounded-xl
                          text-slate-400
                          hover:bg-white/5
                          hover:text-white
                          transition-all duration-200
                        "
                      >

                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>

                      </SidebarMenuSubButton>

                    </SidebarMenuSubItem>

                  ))}

                </SidebarMenuSub>

              </CollapsibleContent>

            </Collapsible>

          ))}

        </SidebarMenu>

      </SidebarGroupContent>

    </SidebarGroup>

  </SidebarContent>

  {/* Footer */}
  <SidebarFooter className="
  border-t border-slate-200
  p-3
">

  <div className="
    rounded-3xl
    bg-gradient-to-r
    from-violet-600
    to-fuchsia-500
    p-2
    shadow-xl
    transition-all duration-300

    group-data-[collapsible=icon]:p-1
  ">

    <Navuser />

  </div>

</SidebarFooter>

  <SidebarRail />

</Sidebar>
  )
}