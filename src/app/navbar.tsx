'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { printRef } from './builder/components/printRef';
import { usePathname, useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { apiService } from '@/services/api';
import { RootState } from '@/store/store';
import { setIsLoggedIn } from '@/store/authSlice';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth || { isLoggedIn: false, loading: true });
  const { execute, loading, error } = useApi();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const pdfUrl = useSelector((state: RootState) => state.pdf.pdfUrl);

  const toggleMenu = () => setOpen(!open);


  const handleLogout = () => {
    if(isLoggedIn){
      router.push('/logout');
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resume.pdf';
      link.click();
    }
  }



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
            {isLoggedIn && pathname!="/builder" && <Link href="/builder" className="hover:text-emerald-600">Builder</Link> }
            {/* {pathname!="/parser" && <Link href="/parser" className="hover:text-emerald-600">Parser</Link>} */}
            {pathname==="/builder" && pdfUrl && <div onClick={handleDownload} className="hover:text-emerald-600 cursor-pointer">Download</div>}
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
            {isLoggedIn && pathname!="/builder" && <Link href="/builder" className="hover:text-emerald-600">Builder</Link> }
            {/* {pathname!="/parser" && <Link href="/parser" className="hover:text-emerald-600">Parser</Link>} */}
            {pathname==="/builder" && pdfUrl && <div onClick={handleDownload} className="hover:text-emerald-600 cursor-pointer">Download</div>}
            {!isLoggedIn &&  <Link href="/register" className="hover:text-emerald-600">Register</Link> }
            {!isLoggedIn &&  <Link href="/login" className="hover:text-emerald-600">Login</Link> }
            {isLoggedIn &&   <div onClick={handleLogout} className="hover:text-emerald-600 cursor-pointer">Logout</div>}
        </div>
      )}
    </nav>
  );
}
