import React, { useState } from 'react';
import ActivityCard from './ActivityCard';

const ActivityList = ({ title, activities }) => {
  const [activeTab, setActiveTab] = useState('Attraction');
  const tabs = ['Attraction', 'Tour', 'Playground'];

  const filteredActivities = activities.filter(a => a.category === activeTab);

  return (
    <div className="py-6 mt-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#1a2b49] flex items-center mb-1">
          <svg className="w-5 h-5 mr-2 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          {title}
        </h2>
        <p className="text-sm text-gray-600">Experience the fun with your loved ones.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-[#7978E9] text-white shadow-sm' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-rose-50/50 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredActivities.map((activity, index) => (
          <ActivityCard 
            key={index}
            title={activity.title}
            location={activity.location}
            image={activity.image}
            price={activity.price}
            originalPrice={activity.originalPrice}
          />
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-50 text-blue-600 font-semibold px-6 py-1.5 rounded-full text-sm hover:bg-blue-100 transition-colors">
          See All
        </button>
      </div>
    </div>
  );
};

export default ActivityList;
