import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * AdminModal – reusable centered modal wrapper.
 * Props:
 *   isOpen   : boolean
 *   onClose  : () => void
 *   title    : string
 *   children : ReactNode
 *   size     : 'sm' | 'md' | 'lg'  (default: 'md')
 */
const SIZE = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const AdminModal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${SIZE[size]} bg-white rounded-2xl shadow-2xl border border-[#f0ecec] flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-base font-black text-slate-800 uppercase tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
