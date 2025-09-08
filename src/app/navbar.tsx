'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { printRef } from './builder/components/printRef';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const handlePrint = useReactToPrint({
    contentRef: printRef
  });

  const pathname = usePathname();

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
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-200 focus:outline-none">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-neutral-900 border-t">
            <Link href="/home" className="hover:text-emerald-600">Home</Link>
            {pathname!="/builder" && <Link href="/builder" className="hover:text-emerald-600">Builder</Link> }
            {pathname!="/parser" && <Link href="/parser" className="hover:text-emerald-600">Parser</Link>}
            {pathname=="/builder"  && <div onClick={handlePrint} className="hover:text-emerald-600 cursor-pointer">Print</div>}
        </div>
      )}
    </nav>
  );
}
