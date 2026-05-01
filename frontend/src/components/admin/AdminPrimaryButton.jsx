import React from 'react';

const AdminPrimaryButton = ({ onClick, type = 'button', icon: Icon, children, className = '', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 bg-[#7C4A4A] hover:bg-[#633b3b] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60 ${className}`}
  >
    {Icon && <Icon size={16} />}
    {children}
  </button>
);

export default AdminPrimaryButton;
