'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Menu, X, Download } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RootState } from '@/store/store';
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"

function NavbarContent() {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth || { isLoggedIn: false, loading: true });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cvId = searchParams.get('cvId');

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };


  const handleLogout = () => {
    if(isLoggedIn){
      router.push('/logout');
    }
  }

  const handleDownloadPdf = async () => {
    if (!cvId) return;
    
    setDownloading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'}/cv/${cvId}/pdf`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };



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
            {isLoggedIn && pathname!="/cvs" && <Link href="/cvs" className="hover:text-emerald-600">CVs</Link> }
            {/* {pathname!="/parser" && <Link href="/parser" className="hover:text-emerald-600">Parser</Link>} */}
            {pathname==="/builder" && cvId && (
              <button 
                onClick={handleDownloadPdf} 
                disabled={downloading}
                className="flex items-center gap-2 hover:text-emerald-600 cursor-pointer disabled:opacity-50"
              >
                <Download size={16} />
                {downloading ? 'Generating...' : 'Download PDF'}
              </button>
            )}
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
        <AnimatePresence>
          <motion.div 
          initial={{x: 1000}}
          animate={{x:0 }}
          transition={{ type: "tween" }}
          onClick={(e) => toggleMenu(e)}
          className="md:hidden fixed inset-0 top-16 flex flex-col text-center gap-4 px-4 pt-2 pb-4 space-y-2 bg-white">
              <Link href="/home" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">Home</Link>
              {isLoggedIn && pathname!="/cvs" && <Link href="/cvs" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">CVs</Link> }
              {/* {pathname!="/parser" && <Link href="/parser" className="hover:text-emerald-600">Parser</Link>} */}
              {pathname==="/builder" && cvId && (
                <button 
                  onClick={handleDownloadPdf} 
                  disabled={downloading}
                  className="flex items-center justify-center gap-2 hover:text-emerald-600 cursor-pointer border-b-2 border-gray-300 py-2 disabled:opacity-50"
                >
                  <Download size={16} />
                  {downloading ? 'Generating...' : 'Download PDF'}
                </button>
              )}
              {!isLoggedIn &&  <Link href="/register" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">Register</Link> }
              {!isLoggedIn &&  <Link href="/login" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">Login</Link> }
              {isLoggedIn &&   <div onClick={handleLogout} className="hover:text-emerald-600 cursor-pointer border-b-2 border-gray-300 py-2">Logout</div>}
          </motion.div>
        </AnimatePresence>

      )}
      
      {/* Download Loading Popup */}
      {downloading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <p className="text-gray-700">Generating PDF, please wait...</p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<nav className="bg-gray-300 shadow-md sticky top-0 z-50"><div className="mx-auto px-4 sm:px-6 lg:px-8"><div className="flex justify-between items-center h-16"><div className="flex-shrink-0"><Link href="/" className="text-2xl font-bold text-emerald-600">Aergia</Link></div></div></div></nav>}>
      <NavbarContent />
    </Suspense>
  );
}
