import React from 'react';

const TabBar = ({ tabs = [], activeTab, onChange }) => (
  <div className="flex items-center border-b border-gray-200 gap-1">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-5 py-3 text-sm font-bold transition-all relative ${
          activeTab === tab ? 'text-[#7C4A4A]' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        {tab}
        {activeTab === tab && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C4A4A] rounded-full" />
        )}
      </button>
    ))}
  </div>
);

export default TabBar;
