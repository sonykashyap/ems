import React, { useEffect, useState } from 'react';

interface dashboardData {
  text: string;
  value: string;
}

const Dashboard = () => {

    const [data, setData] = useState<dashboardData[]>([
        {text: "Total monthly Expenses", value: "200/365"},
        {text: "Total Revenue", value: "500k"},
        {text: "Total Employees", value: "400"},
        {text: "Total Projects", value: "100"},
    ]);

    useEffect(()=>{
        console.log("Dashboard Compoenent called");
    },[]);
    
    return(
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {data && data.map((d, i)=>{
                    return <div key={i} className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-4 px-4'>
                        <p className='tracking-wide capitalize'> {d.text} </p>
                        <div className='text-center mt-4'>
                            <span className='text-3xl text-purple-100 font-bold text-center'> {d.value} </span>
                        </div>
                    </div>
                })}
                
            </div>
        </>
    )
}

export default Dashboard;