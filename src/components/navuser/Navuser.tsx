import React, { useEffect, useState } from 'react';
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
import {getProfile, getUserProfilePic, LOGOUT, resetUserState} from "@/reducers/userReducer"; 
import { resetRolesState } from '@/reducers/roleReducer';
import { useAppSelector } from '@/hooks';


const Navuser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isMobile } = useSidebar();
    const userData =  JSON.parse(localStorage.getItem("userData") ?? "");
    const userProfile = useAppSelector(state=> state.userReducer.userProfileData);
    const userProfilePic = localStorage.getItem("userProfilePic") ?? "";
    const [userName, setUserName] = useState("");
    const [profilePic, setProfilePic] = useState("")

    const logout = () => {
        dispatch(LOGOUT());
        dispatch(resetRolesState());
        dispatch(resetUserState());
        setTimeout(()=>{
        navigate("/login");
        }, 500);
    }

    useEffect(()=>{
        if(userProfile){
            setUserName(userProfile.name);
        }

    },[userProfile]);

    useEffect(()=> {
        dispatch(getProfile());
        // dispatch(getUserProfilePic());
    },[dispatch]);

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
                                <AvatarImage 
                                    src={ userProfilePic.length > 0 ? `${import.meta.env.VITE_BACKEND_HOST}/`+userProfilePic : undefined} 
                                    alt="User profile image" 
                                    className='object-cover'
                                />
                                <AvatarFallback className="rounded-lg bg-transparent">
                                    <img src={AvatarImg} alt="" />
                                </AvatarFallback>
                            </Avatar>
                            
                            <div className="grid flex-1 text-left text-sm leading-tight group-hover:text-black text-white">
                                <span className="truncate font-medium group-hover/main:text-black group-hover:text-white group-data-[state=open]:text-black"> {userName }<span className='text-xs text-yellow-300'> ({userData?.role}) </span> </span>
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
                            <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link to='/users/profile'><BadgeCheck /> Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/notifications"><Bell /> Notifications</Link>
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