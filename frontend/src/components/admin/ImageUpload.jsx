import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ label, name, defaultValue }) => {
  const [preview, setPreview] = useState(defaultValue || '');

  const handleUrlChange = (e) => {
    setPreview(e.target.value);
  };

  const isSafeUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  return (
    <div>
      {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>}
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          {preview && isSafeUrl(preview) ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-300" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            name={name}
            defaultValue={defaultValue}
            onChange={handleUrlChange}
            placeholder="Enter image URL..."
            className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all"
          />
          <p className="text-[10px] text-gray-400 font-medium">Provide a direct image URL.</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
