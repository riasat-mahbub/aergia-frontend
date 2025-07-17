'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="bg-neutral-900 shadow-md sticky top-0 z-50">
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
            <Link href="/home" className="text-gray-200 hover:text-emerald-600">Home</Link>
            <Link href="/importer" className="text-gray-200 hover:text-emerald-600">Builder</Link>
            <Link href="/parser" className="text-gray-200 hover:text-emerald-600">Parser</Link>
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
          <Link href="/home" className="block text-gray-200 hover:text-emerald-600">Home</Link>
          <Link href="/importer" className="block text-gray-200 hover:text-emerald-600">Builder</Link>
          <Link href="/parser" className="block text-gray-200 hover:text-emerald-600">Parser</Link>
        </div>
      )}
    </nav>
  );
}
