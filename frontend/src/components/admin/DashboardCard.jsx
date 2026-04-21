import React from 'react';

const DashboardCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  trendValue, 
  iconBgColor = 'bg-[#faeceb]', 
  iconColor = 'text-[#7C4A4A]' 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#f0ecec] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgColor}`}>
          {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
        </div>
        
        {/* Trend pill */}
        {trendValue && (
          <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm ${
            trend === 'up' 
              ? 'bg-[#eefcf2] text-[#42b872]' 
              : trend === 'down'
                ? 'bg-[#fef3f2] text-[#e0455d]'
                : 'bg-gray-100 text-gray-500'
          }`}>
            {trend === 'up' && <span className="mr-1">↗</span>}
            {trend === 'down' && <span className="mr-1">↘</span>}
            {trendValue}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{title}</h3>
        <div className="text-3xl font-black text-slate-800">{value}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
