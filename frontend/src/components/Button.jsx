import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-colors cursor-pointer border';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const variantStyles = {
    primary: 'bg-[#765FDD] border-transparent text-white shadow-md hover:bg-[#180B51]',
    outline: 'bg-transparent border-[#765FDD] text-[#765FDD] hover:bg-[#D1D3DD]',
    ghost: 'bg-transparent border-transparent text-gray-700 hover:bg-[#D1D3DD]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}