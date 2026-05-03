import React from 'react';

const FormInput = ({ label, name, defaultValue, type = 'text', placeholder, required }) => (
  <div>
    {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>}
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all"
    />
  </div>
);

export default FormInput;
