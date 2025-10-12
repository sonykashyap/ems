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
import { NavLink, Link } from 'react-router-dom';
import {LOGOUT} from "@/reducers/userReducer"; 


const Navuser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isMobile } = useSidebar();
    const userData =  JSON.parse(localStorage.getItem("userData"));

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
                    <DropdownMenuTrigger asChild className="group/main">
                        <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent group data-[state=open]:text-sidebar-accent-foreground"
                        >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={AvatarImg} alt="User profile image" />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight group-hover:text-black text-white">
                            <span className="truncate font-medium group-hover/main:text-black group-hover:text-white group-data-[state=open]:text-black"> {userData?.name }<span className='text-xs text-yellow-300'> ({userData?.role}) </span> </span>
                            <span className="truncate text-xs group-hover/main:text-black group-hover:text-white group-data-[state=open]:text-black"> {userData?.email} </span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4 group-hover/main:text-black group-hover:text-white group-hover:text-black group-data-[state=open]:text-black text-white" />
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
                            <span className="truncate font-medium"> {userData?.name} </span>
                            <span className="truncate text-xs"> {userData?.email} </span>
                            </div>
                        </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeCheck />
                                <Link to='/profile'>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell />
                             <Link to="/notifications">Notifications</Link>
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