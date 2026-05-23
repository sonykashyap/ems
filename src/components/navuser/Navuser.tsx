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
    const userProfilePic =  useAppSelector(state=> state.userReducer.userProfile);;
    const [userName, setUserName] = useState("");
    const [profilePic, setProfilePic] = useState("")

    const logout = () => {
        dispatch(LOGOUT());
        dispatch(resetRolesState());
        dispatch(resetUserState());
        // setTimeout(()=>{
        navigate("/login");
        // }, 500);
    }

    useEffect(()=>{
        if(userProfile){
            setUserName(userProfile.name);
        }

    },[userProfile]);

    useEffect(()=> {
        dispatch(getProfile());
        dispatch(getUserProfilePic());
    },[dispatch]);

    return(
        <>
            <SidebarMenu>

                <SidebarMenuItem>

                    <DropdownMenu>

                        {/* Trigger */}
                        <DropdownMenuTrigger asChild className="group/main">

                            <SidebarMenuButton
                                size="lg"
                                className="
                                    relative
                                    overflow-hidden

                                    rounded-3xl
                                    border border-white/10

                                    bg-gradient-to-r
                                    from-violet-600
                                    via-purple-500
                                    to-fuchsia-500

                                    text-white

                                    shadow-xl
                                    shadow-violet-500/20

                                    transition-all duration-300

                                    hover:scale-[1.02]
                                    hover:shadow-2xl
                                    hover:shadow-violet-500/30

                                    data-[state=open]:scale-[1.02]

                                    px-3 py-7

                                    group-data-[collapsible=icon]:justify-center
                                    group-data-[collapsible=icon]:px-2
                                "
                            >

                                {/* Glow Effect */}
                                <div className="
                                    absolute inset-0
                                    bg-white/10
                                    opacity-0
                                    transition-opacity duration-300
                                    group-hover/main:opacity-100
                                "></div>

                                {/* Avatar */}
                                <Avatar className="
                                    relative z-10
                                    h-12 w-12
                                    rounded-2xl
                                    border-2 border-white/20
                                    shadow-md
                                    shrink-0
                                ">

                                    <AvatarImage
                                        src={
                                            userProfilePic.length > 0
                                                ? `${import.meta.env.VITE_BACKEND_HOST}/` + userProfilePic
                                                : undefined
                                        }
                                        alt="User profile image"
                                        className="object-cover"
                                    />

                                    <AvatarFallback className="
                                        rounded-2xl
                                        bg-white/10
                                        backdrop-blur-xl
                                    ">
                                        <img
                                            src={AvatarImg}
                                            alt=""
                                            className="rounded-2xl object-cover"
                                        />
                                    </AvatarFallback>

                                </Avatar>

                                {/* User Info */}
                                <div className="
                                    relative z-10
                                    grid flex-1 text-left leading-tight

                                    group-data-[collapsible=icon]:hidden
                                ">

                                    {/* Name */}
                                    <span className="
                                        truncate
                                        text-base
                                        font-semibold
                                        text-white
                                    ">
                                        {userName}

                                        <span className="
                                            ml-1
                                            text-xs
                                            font-medium
                                            text-yellow-200
                                        ">
                                            ({userData?.role})
                                        </span>
                                    </span>

                                    {/* Email */}
                                    <span className="
                                        truncate
                                        text-xs
                                        text-white/80
                                    ">
                                        {userData?.email}
                                    </span>

                                </div>

                                {/* Arrow */}
                                <ChevronsUpDown className="
                                    relative z-10
                                    ml-auto
                                    size-4
                                    text-white/80

                                    transition-transform duration-300

                                    group-data-[state=open]:rotate-180

                                    group-data-[collapsible=icon]:hidden
                                " />

                            </SidebarMenuButton>

                        </DropdownMenuTrigger>

                        {/* Dropdown */}
                        <DropdownMenuContent
                            className="
                                min-w-64
                                rounded-3xl
                                border border-slate-200

                                bg-white/95
                                backdrop-blur-2xl

                                shadow-2xl

                                p-2
                            "
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={8}
                        >

                            {/* Menu Items */}
                            <DropdownMenuGroup className="space-y-1">

                                <DropdownMenuItem
                                    asChild
                                    className="
                                        rounded-2xl
                                        py-3
                                        cursor-pointer

                                        hover:bg-violet-50
                                        hover:text-violet-700

                                        transition-all duration-200
                                    "
                                >

                                    <Link
                                        to="/users/profile"
                                        className="flex items-center gap-3"
                                    >
                                        <BadgeCheck size={18} />
                                        Profile
                                    </Link>

                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    asChild
                                    className="
                                        rounded-2xl
                                        py-3
                                        cursor-pointer

                                        hover:bg-violet-50
                                        hover:text-violet-700

                                        transition-all duration-200
                                    "
                                >

                                    <Link
                                        to="/notifications"
                                        className="flex items-center gap-3"
                                    >
                                        <Bell size={18} />
                                        Notifications
                                    </Link>

                                </DropdownMenuItem>

                            </DropdownMenuGroup>

                            <DropdownMenuSeparator className="my-2 bg-slate-200" />

                            {/* Logout */}
                            <DropdownMenuItem
                                onClick={logout}
                                className="
                                    rounded-2xl
                                    py-3

                                    cursor-pointer

                                    text-red-600

                                    hover:bg-red-50
                                    hover:text-red-700

                                    transition-all duration-200
                                "
                            >

                                <div className="flex items-center gap-3">
                                    <LogOut size={18} />
                                    Log out
                                </div>

                            </DropdownMenuItem>

                        </DropdownMenuContent>

                    </DropdownMenu>

                </SidebarMenuItem>

            </SidebarMenu>
        </>
    )
}

export default Navuser;