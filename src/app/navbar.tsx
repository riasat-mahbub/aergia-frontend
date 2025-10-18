'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth || { isLoggedIn: false, loading: true });
  const router = useRouter();
  const pathname = usePathname();
  const pdfUrl = useSelector((state: RootState) => state.pdf.pdfUrl);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };


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
            {isLoggedIn && pathname!="/cvs" && <Link href="/cvs" className="hover:text-emerald-600">CVs</Link> }
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
              {pathname==="/builder" && pdfUrl && <div onClick={handleDownload} className="hover:text-emerald-600 cursor-pointer border-b-2 border-gray-300 py-2">Download</div>}
              {!isLoggedIn &&  <Link href="/register" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">Register</Link> }
              {!isLoggedIn &&  <Link href="/login" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">Login</Link> }
              {isLoggedIn &&   <div onClick={handleLogout} className="hover:text-emerald-600 cursor-pointer border-b-2 border-gray-300 py-2">Logout</div>}
          </motion.div>
        </AnimatePresence>

      )}
    </nav>
  );
}
