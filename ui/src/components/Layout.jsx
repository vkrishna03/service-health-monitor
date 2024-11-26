import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import logo from "../assets/logo.png"

const Layout = () => {

    const location = useLocation();
    const path = location.pathname;

  return (
    // Grid Layout
    <div className='h-screen w-screen max-w-full p-0 m-0 grid grid-rows-[60px_1fr] bg-white'>

        {/* Header Container*/}
        <div className='row-start-1 row-end-2 h-full'>
        
            {/* Header */}
            <header className='h-full px-2 w-full shadow-md border-b-[0.5px] border-b-slate-500 border-opacity-40 flex justify-start items-center gap-2'>
            
                {/* Header Logo */}
                <div className='w-[160px] h-4/6'>
                    <img src={logo} alt="Logo" className='h-full w-full object-contain'/>
                </div>

                {/* Header Nav */}
                <div className='w-full h-full flex items-center justify-center'>
                    <nav className='flex gap-8 mx-auto pr-36'>
                        <a href="/" className={`${path === "/" ? "font-semibold": "font-normal"}`}>Services</a>
                        <a href="/incidents" className={`${path === "/incidents" ? "font-semibold": "font-normal"}`}>Incidents</a>
                        <a href="/logs" className={`${path === "/logs" ? "font-semibold": "font-normal"}`}>Uptime Logs</a>
                    </nav>
                </div>
            </header>
        </div>

        <main className='px-20 row-start-2 h-full pt-8'>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout