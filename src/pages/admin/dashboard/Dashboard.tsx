import React, { useEffect, useState } from 'react';


const Dashboard = () => {

    useEffect(()=>{
        console.log("Dashboard Compoenent called");
    },[]);
    
    return(
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-4 px-4'>
                    <p className='tracking-wide capitalize'>total attendance</p>
                    <div className='text-center mt-4'>
                        <span className='text-3xl text-purple-100 font-bold text-center'>200 / 365</span>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-purple-500 from-10% via-purple-500 via-30% to-purple-500 to-90% rounded-lg text-white py-16 px-4'>2</div>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>3</div>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>4</div>
                <div className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-16 px-4'>5</div>
            </div>
        </>
    )
}

export default Dashboard;