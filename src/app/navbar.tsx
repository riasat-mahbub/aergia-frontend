'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { printRef } from './builder/components/printRef';
import { usePathname, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { apiService } from '@/services/api';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { execute, loading, error } = useApi();
  const router = useRouter()
  
  const pathname = usePathname();


  const toggleMenu = () => setOpen(!open);

  const handlePrint = useReactToPrint({
    contentRef: printRef
  });

  const handleLogout = async () => {
    if(isLoggedIn){
      const result = await execute( () => apiService.auth.logout())

      if(result){
        setIsLoggedIn(false)
        router.push('/')
      }
    }
  }

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const result = await execute(() => apiService.auth.isLoggedIn());
      
      if (result) {
       setIsLoggedIn(true)
      }
    }

    checkIfLoggedIn();
  }, [pathname])

  return (
    <nav className="bg-gray-300 shadow-md sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-emerald-600">
              Aergia
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/home" className="hover:text-emerald-600">Home</Link>
            {pathname!="/builder" && <Link href="/builder" className="hover:text-emerald-600">Builder</Link> }
            {pathname!="/parser" && <Link href="/parser" className="hover:text-emerald-600">Parser</Link>}
            {pathname=="/builder"  && <div onClick={handlePrint} className="hover:text-emerald-600 cursor-pointer">Print</div>}
            {!isLoggedIn &&  <Link href="/register" className="hover:text-emerald-600">Register</Link> }
            {!isLoggedIn &&  <Link href="/login" className="hover:text-emerald-600">Login</Link> }
            {isLoggedIn &&   <div onClick={handleLogout} className="hover:text-emerald-600 cursor-pointer">Logout</div>}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-row gap-4 px-4 pt-2 pb-4 space-y-2 bg-white">
            <Link href="/home" className="hover:text-emerald-600">Home</Link>
            {pathname!="/builder" && <Link href="/builder" className="hover:text-emerald-600">Builder</Link> }
            {pathname!="/parser" && <Link href="/parser" className="hover:text-emerald-600">Parser</Link>}
            {pathname=="/builder"  && <div onClick={handlePrint} className="hover:text-emerald-600 cursor-pointer">Print</div>}
            {!isLoggedIn &&  <Link href="/register" className="hover:text-emerald-600">Register</Link> }
            {!isLoggedIn &&  <Link href="/login" className="hover:text-emerald-600">Login</Link> }
            {isLoggedIn &&   <div onClick={handleLogout} className="hover:text-emerald-600 cursor-pointer">Logout</div>}
        </div>
      )}
    </nav>
  );
}
