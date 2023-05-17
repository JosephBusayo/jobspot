import React from 'react'
import '../Styles/Navbar.css';


export function Navbar({ navDisplay }) {
    return (
        <section className='nav'>
            <h2 className='logo'>Job<span className='logo-span'>spot</span></h2>

            <div className='nav-menu'>
                <p className='btn menu-btn'>Jobs</p>
                <p className='btn menu-btn'
                    style={{display: navDisplay ? 'none' : ''}}
                >Login</p>
                <p className='btn menu-btn'
                    style={{display: navDisplay ? 'none' : ''}}
                >Sign up</p>
                <button className='btn menu-btn post-job-btn' 
                    style={{ display: navDisplay ? '' : 'none' }}
                >Post Job</button>
            </div>
        </section>
    )
}
