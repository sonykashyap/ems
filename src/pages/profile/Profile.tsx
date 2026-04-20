import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearToast, getProfile, getUserProfilePic, updateProfile, updateProfilePic } from '@/reducers/userReducer';
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
    const userProfilePic = localStorage.getItem("userProfilePic") ?? "";
    const userProfileData = useAppSelector(state=> state.userReducer.userProfileData);
    const toaster = useAppSelector(state=> state.userReducer.toast);
    const loading = useAppSelector(state=> state.userReducer.loading);
    const [formData, setFormData] = useState<UsersData | null>(null);
    const [show, setShow] = useState(false);
    const [profilePic, setProfilePic] = useState("");

    useEffect(()=>{
        dispatch(getProfile());
    },[dispatch]);


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

    const handleProfileChange =async (e) => {
        console.log("user Profile Changed", e.target.files[0]);
        const formData = new FormData();
        formData.append("profile_pic", e.target.files[0]);

        await dispatch(updateProfilePic(formData)).unwrap();
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
                className={`transform transition-all duration-300 w-full lg:w-[600px] 
                m-auto bg-white mt-20 p-6 relative rounded-2xl ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                <div className='flex justify-end items-center relative rounded mb-10'>
                    <Avatar className="h-40 w-40 -mt-[100px] absolute bg-white left-[50%] -translate-x-1/2 rounded-full p-2 border boder-black/10 shadow-xl">
                        <AvatarImage 
                            src={ userProfilePic.length > 0 ? `${import.meta.env.VITE_BACKEND_HOST}/`+userProfilePic : undefined} 
                            alt="User profile image" 
                            className='w-full h-full rounded-full object-cover' 
                        />
                        <AvatarFallback className="rounded-lg flex justify-center items-center">
                            <img src={AvatarImg} alt="" className='w-34 h-34 object-cover' />
                        </AvatarFallback>
                    </Avatar>
                    <label htmlFor="file" className='text-blue-500 hover:cursor-pointer hover:underline'>Edit Profile Pic</label>
                    <input
                        id='file' 
                        name='file'
                        type="file"
                        className='hidden'
                        onChange={(e)=>handleProfileChange(e)}
                    />
                </div>
                <div>
                    <div className='grid grid-cols-1'>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                id='name'
                                type="text" 
                                name='name'
                                value={formData?.name ?? ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFormData((prev) =>
                                        prev
                                        ? { ...prev, name: value }
                                        : prev
                                    );
                                }}
                                className='w-full rounded-md border placeholder:text-sm placeholder:italic border-black/10 h-9 p-3' 
                            />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="email">Email</label>
                            <input
                                id='email'
                                type="text" 
                                value={formData?.email}
                                disabled={true} 
                                name='email' 
                                className='w-full disabled:bg-gray-100 rounded-md border placeholder:text-sm placeholder:italic border-black/10 h-9 p-3' 
                            />
                        </div>
                        <Button onClick={updateUserProfile} disabled={loading} className='mt-5 disabled:bg-gray-100'>
                            {!loading ? 'Update' : 'Updating...'}
                            </Button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Profile;