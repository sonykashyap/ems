import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayouts';


const Dashboard = () => {

    useEffect(()=>{
        console.log("Dashboard Compoenent called");
    },[]);
    
    return(
        <>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>1</div>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>2</div>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>3</div>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>4</div>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>5</div>
            </div>
        </>
    )
}

export default Dashboard