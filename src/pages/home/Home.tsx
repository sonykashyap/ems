import React from 'react';
import ReactLogo from '@/assets/react.svg';
import {useNavigate } from 'react-router';
import './Home.scss';


const Home = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    return(
        <>
            <h1>Home</h1>
            <button className='text-rose-500' onClick={logout}>Logout</button>
        </>
        
        
    )
}

export default Home;