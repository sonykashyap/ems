import React, { useEffect } from 'react';
import './Home.scss';


const Home = () => {

    useEffect(()=>{
        console.log("Home called");
    }, []);
    
    return(
        <>
            <h1>User Home</h1>
        </>
        
        
    )
}

export default Home;