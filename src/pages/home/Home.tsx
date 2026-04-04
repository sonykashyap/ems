import React, { useEffect, useMemo } from 'react';
import './Home.scss';
import Child from '@/pages/reports/Reports';



const Home = ({}) => {

    const memoData = useMemo(() => {
        return { name: "John" };
    }, []);
    
    return(
        <>
            <Child data={memoData} />
        </>
        
        
    )
}

export default Home;