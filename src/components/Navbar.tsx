import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { apiService } from '@/services/electronApi';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const cvId = searchParams.get('cvId');

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleDownloadPdf = async () => {
    if (!cvId) return;

    setDownloading(true);
    try {
      const buffer = await apiService.pdf.generate(cvId);
      
      if (!buffer) {
        throw new Error('Failed to generate PDF');
      }

      const uint8Array = new Uint8Array(buffer as unknown as ArrayBufferLike);
      const result = await window.electronAPI.savePdf(uint8Array.buffer as ArrayBuffer, 'resume.pdf');
      
      if (!result.success) {
        console.log('PDF save cancelled');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <nav className="bg-gray-300 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-emerald-600">
              Aergia
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="hover:text-emerald-600">Home</Link>
            {location.pathname !== "/cvs" && <Link to="/cvs" className="hover:text-emerald-600">CVs</Link>}
            {location.pathname === "/builder" && cvId && (
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="flex items-center gap-2 hover:text-emerald-600 cursor-pointer disabled:opacity-50"
              >
                <Download size={16} />
                {downloading ? 'Generating...' : 'Download PDF'}
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <AnimatePresence>
          <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ type: "tween" }}
            onClick={(e) => toggleMenu(e)}
            className="md:hidden fixed inset-0 top-16 flex flex-col text-center gap-4 px-4 pt-2 pb-4 space-y-2 bg-white"
          >
            <Link to="/home" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">Home</Link>
            {location.pathname !== "/cvs" && <Link to="/cvs" className="hover:text-emerald-600 border-b-2 border-gray-300 py-2">CVs</Link>}
            {location.pathname === "/builder" && cvId && (
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="flex items-center justify-center gap-2 hover:text-emerald-600 cursor-pointer border-b-2 border-gray-300 py-2 disabled:opacity-50"
              >
                <Download size={16} />
                {downloading ? 'Generating...' : 'Download PDF'}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}

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
