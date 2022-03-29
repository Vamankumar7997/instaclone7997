import React from 'react';
import './home.css';
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className='main-container'>
            <div>
                <img src='https://images.unsplash.com/photo-1643981670720-eef07ebdb179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' alt='profile'></img>
            </div>
            <div>
                <p className='para'>Hello</p>
                <Link to='/posts'><button className='home-button'>Enter</button></Link>
            </div>
        </div>
        
    );
}