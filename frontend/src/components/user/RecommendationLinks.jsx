import React, { useState } from 'react';

const RecommendationLinks = ({ groups }) => {
  const [activeTab, setActiveTab] = useState('Top flight destinations');
  const tabs = ['Top flight destinations', 'Popular hotel destinations', 'Top things to do'];

  return (
    <div className="py-8 mt-4 mb-10">
      <h2 className="text-xl font-bold text-[#1a2b49] flex items-center mb-4">
        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2z" fill="#7978E9"/>
          <path d="M12 10l-4 8h8l-4-8z" fill="#FFF"/>
        </svg>
        HANUVIVU recommendations
      </h2>
      
      <div className="flex space-x-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-[#1a2b49] text-white shadow-sm' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {groups.map((group, index) => (
            <div key={index} className="flex flex-col space-y-2">
              {group.links.map((link, idx) => (
                <a key={idx} href={link.url} className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationLinks;
