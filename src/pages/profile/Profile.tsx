import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearToast, getProfile, getUserProfilePic, updateProfile } from '@/reducers/userReducer';
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
    const userProfile = useAppSelector(state=> state.userReducer.userProfile);
    const userProfileData = useAppSelector(state=> state.userReducer.userProfileData);
    const toaster = useAppSelector(state=> state.userReducer.toast);
    const loading = useAppSelector(state=> state.userReducer.loading);
    const [formData, setFormData] = useState<UsersData | null>(null);


    useEffect(()=>{
        dispatch(getUserProfilePic());
        dispatch(getProfile());
    },[dispatch]);

    useEffect(()=>{
        if(userProfileData){
            setFormData(userProfileData)
        }
    },[userProfileData]);


    const updateUserProfile = async () => {
        const payload = {
            name: formData?.name
        }
        await dispatch(updateProfile(payload)).unwrap();
        dispatch(getProfile());
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

    return(
        <>
            <div className='w-full lg:w-[600px] m-auto bg-white mt-16 p-6 relative rounded-2xl'>
                <div className='flex justify-center items-center rounded mb-10'>
                    {
                        userProfile ?
                        <img src={userProfile} alt='' />
                        : <Avatar className="h-40 w-40 -mt-[100px] group relative bg-white rounded-full p-4 border boder-black/10 shadow-xl">
                            <AvatarImage src={AvatarImg} alt="User profile image" className='' />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            {/* <span 
                                className='group-hover:block absolute shadow bg-white/70 flex items-center justify-center rounded-full w-full h-full -mt-[100px]'
                            >Edit</span> */}
                        </Avatar>
                    }
                    
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