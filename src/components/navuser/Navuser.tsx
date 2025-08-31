import React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import AvatarImg from '@/assets/images/avatar.webp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {LOGOUT} from "@/reducers/userReducer"; 


const Navuser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isMobile } = useSidebar();

    const logout = () => {
    dispatch(LOGOUT());
    setTimeout(()=>{
      navigate("/login");
    }, 500);
  }

    return(
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent group data-[state=open]:text-sidebar-accent-foreground"
                        >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={AvatarImg} alt="Sam" />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight group-hover:text-black text-white">
                            <span className="truncate font-medium">Sam</span>
                            <span className="truncate text-xs">sam@gmail.com</span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4 group-hover:text-black text-white" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={AvatarImg} alt="Sam" />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">Sam</span>
                            <span className="truncate text-xs">sam@gmail.com</span>
                            </div>
                        </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeCheck />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell />
                            Notifications
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="text-red-600">
                        <LogOut color="red" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </>
    )
}

export default Navuser;