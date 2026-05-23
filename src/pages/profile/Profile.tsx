import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearToast, getProfile, getUserProfile, getUserProfilePic, updateProfile, updateProfilePic } from '@/reducers/userReducer';
import React, { useEffect, useState } from 'react';
import AvatarImg from '@/assets/images/avatar.webp';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


type roleIdType = {
    createdAt: string;
    description: string;
    name: string;
    updatedAt: string;
    _id: string;
}

type UsersData = {
  id: string;
  name: string;
  email: string;
  roleId: roleIdType[]
}

const Profile = () => {
    const dispatch = useAppDispatch();
    const userProfilePic = useAppSelector(state=> state.userReducer.userProfile);
    const userProfileData = useAppSelector(state=> state.userReducer.userProfileData);
    const toaster = useAppSelector(state=> state.userReducer.toast);
    const loading = useAppSelector(state=> state.userReducer.loading);
    const [formData, setFormData] = useState<UsersData | null>(null);
    const [show, setShow] = useState(false);
    const [profilePic, setProfilePic] = useState("");

    useEffect(()=>{
        dispatch(getUserProfilePic());
        dispatch(getProfile());
    },[]);

    useEffect(()=>{
        if(userProfileData){
            setFormData(userProfileData)
        }
    },[userProfileData]);


    const updateUserProfile = async () => {
        const payload = {
            name: formData?.name ?? ""
        }
        await dispatch(updateProfile(payload)).unwrap();
        dispatch(getProfile());
    }

    const handleProfileChange =async (e:React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const file = e.target.files?.[0];
        if(!file) return;
        formData.append("profile_pic", file);

        await dispatch(updateProfilePic(formData)).unwrap();
        dispatch(getUserProfilePic());
    }


    useEffect(() => {
    if (!toaster.message) return;
    
    toast(toaster.message, {
        classNames: {
        toast:
            toaster.type === "success"
            ? "!bg-green-200"
            : "!bg-red-200",
        title:
            toaster.type === "success"
            ? "!text-green-600 font-bold"
            : "!text-red-600 font-bold",
        },
    });
    dispatch(clearToast());
    }, [toaster]);

    useEffect(() => {
        setShow(true);
    }, []);

    return(
        <>
            <div
                className={`transform transition-all duration-500 w-full lg:w-[700px] 
                m-auto mt-20 ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/5">

                {/* Banner */}
                <div className="h-44 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 relative">

                    {/* Avatar */}
                    <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
                        <div className="relative group">
                            <Avatar className="h-28 w-28 rounded-full bg-white p-2 shadow-2xl border-[5px] border-white overflow-hidden">
                                <AvatarImage
                                    src={
                                        userProfilePic.length > 0
                                            ? `${import.meta.env.VITE_BACKEND_HOST}/` + userProfilePic
                                            : undefined
                                    }
                                    alt="User profile image"
                                    className="w-full h-full rounded-full object-cover"
                                />

                                <AvatarFallback className="rounded-full flex justify-center items-center bg-gray-100 overflow-hidden">
                                    <img
                                        src={AvatarImg}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </AvatarFallback>
                            </Avatar>

                            {/* Hover Overlay */}
                            <label
                                htmlFor="file"
                                className="absolute inset-0 rounded-full bg-black/50 
                                flex justify-center items-center text-white text-sm 
                                font-medium opacity-0 group-hover:opacity-100 
                                transition-all duration-300 cursor-pointer"
                            >
                                Change
                            </label>

                            <input
                                id="file"
                                name="file"
                                type="file"
                                className="hidden"
                                onChange={(e) => handleProfileChange(e)}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-24 pb-10 px-6 md:px-10">

                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">
                            My Profile
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Manage your account information
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mt-10 grid grid-cols-1 gap-6">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData?.name ?? ""}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setFormData((prev) =>
                                        prev
                                            ? { ...prev, name: value }
                                            : prev
                                    );
                                }}
                                className="w-full rounded-xl border border-gray-200 
                                bg-gray-50 h-12 px-4 outline-none transition-all duration-300
                                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="text"
                                value={formData?.email}
                                disabled={true}
                                name="email"
                                className="w-full rounded-xl border border-gray-200 
                                bg-gray-100 text-gray-500 h-12 px-4 cursor-not-allowed"
                            />
                        </div>

                        {/* Button */}
                        <Button
                            onClick={updateUserProfile}
                            disabled={loading}
                            className="mt-2 h-12 rounded-xl text-base font-semibold
                            bg-gradient-to-r from-blue-600 to-indigo-600
                            hover:from-blue-700 hover:to-indigo-700
                            transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {!loading ? "Save Changes" : "Updating..."}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;