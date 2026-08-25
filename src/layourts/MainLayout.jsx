import React from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface)] text-[var(--text-ink)] dark:bg-[var(--surface-dark)] dark:text-[var(--text-dark-ink)]">
      <Navbar></Navbar>
      <div className='flex-1'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout
