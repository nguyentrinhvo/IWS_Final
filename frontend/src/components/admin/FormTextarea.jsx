import React from 'react';

const FormTextarea = ({ label, name, defaultValue, rows = 3, placeholder, required }) => (
  <div>
    {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>}
    <textarea
      name={name}
      defaultValue={defaultValue}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all"
    />
  </div>
);

export default FormTextarea;
