import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Banknote, 
  Ticket, 
  Users, 
  Compass,
  MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import DashboardCard from '../../components/admin/DashboardCard';
import { getDashboardStats, getAllBookings } from '../../services/adminService';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, bookingsData] = await Promise.all([
          getDashboardStats(),
          getAllBookings({ page: 0, size: 5 })
        ]);
        setStats(statsData);
        setRecentBookings(bookingsData.content || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C4A4A]"></div>
      </div>
    );
  }

  // Map backend data to chart formats
  const revenueChartData = stats?.last12MonthsRevenue?.map(item => ({
    name: item.month.split('-')[1], // Just show month number or convert to name
    value: item.revenue
  })) || [];

  const paymentMixData = stats?.revenueByProvider ? Object.entries(stats.revenueByProvider).map(([name, value], index) => ({
    name,
    value,
    color: index === 0 ? '#7C4A4A' : index === 1 ? '#fca5a5' : '#e5e7eb'
  })) : [];

  const totalBookings = stats?.bookingCountsByStatus 
    ? Object.values(stats.bookingCountsByStatus).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="space-y-6 xl:space-y-8 animate-in fade-in duration-500">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8">
        <DashboardCard 
          title="TOTAL REVENUE" 
          value={`$${(stats?.currentYearRevenue || 0).toLocaleString()}`} 
          icon={Banknote} 
          trend="up" 
          trendValue="+0%" 
        />
        <DashboardCard 
          title="TOTAL BOOKINGS" 
          value={totalBookings.toString()} 
          icon={Ticket} 
          trend="up" 
          trendValue="+0%" 
        />
        <DashboardCard 
          title="NEW USERS" 
          value={(stats?.newUsersThisMonth || 0).toString()} 
          icon={Users} 
          trend="up" 
          trendValue="+0%" 
        />
        <DashboardCard 
          title="ACTIVE TOURS" 
          value={(stats?.topTours?.length || 0).toString()} 
          icon={Compass} 
          trend="stable" 
          trendValue="Stable" 
        />
      </div>

      {/* Row 2: Revenue Insights (Full Width) */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-[#f0ecec] p-4 md:p-6 h-[400px] flex flex-col overflow-hidden">
        <div className="flex justify-between items-start sm:items-center mb-6 gap-4 flex-col sm:flex-row">
          <div>
            <h2 className="text-base md:text-lg font-bold text-slate-800 uppercase tracking-tight">Revenue Insights</h2>
            <p className="text-sm text-gray-500">Monthly transactional volume for the last 12 months</p>
          </div>
          <select className="bg-gray-100 border-none text-sm font-bold text-slate-700 py-1.5 px-3 rounded-md outline-none cursor-pointer">
            <option>Last 12 Months</option>
          </select>
        </div>
        
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueChartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} 
                dy={10}
              />
              <Tooltip 
                cursor={{fill: '#fcfaf9'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                radius={[6, 6, 0, 0]} 
                fill="#faeceb"
              >
                {revenueChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === revenueChartData.length - 1 ? '#7C4A4A' : '#faeceb'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Recent Bookings (Full Width) */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-[#f0ecec] flex flex-col overflow-hidden">
        <div className="p-4 md:p-6 flex justify-between items-center border-b border-gray-100 bg-[#fcfaf9]">
           <h2 className="text-base md:text-lg font-bold text-slate-800 uppercase tracking-tight">Recent Bookings</h2>
           <button className="text-xs font-black text-[#7C4A4A] uppercase tracking-widest hover:underline">
             View All
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-4 md:px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Booking ID</th>
                <th className="py-4 px-4 md:px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Service</th>
                <th className="py-4 px-4 md:px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Destination</th>
                <th className="py-4 px-4 md:px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Status</th>
                <th className="py-4 px-4 md:px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-50 last:border-b-0 hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-4 px-4 md:px-6 text-sm font-bold text-slate-800 whitespace-nowrap group-hover:text-[#7C4A4A]">#{booking.id.substring(0, 8)}</td>
                  <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-[#faeceb] flex items-center justify-center text-[#7C4A4A] text-[10px] font-black shrink-0 uppercase">
                        {booking.serviceType.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none">{booking.snapshotName}</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tight">{booking.serviceType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 md:px-6 text-sm font-bold text-gray-500 whitespace-nowrap">
                    {booking.snapshotDetail?.destination || booking.snapshotDetail?.city || 'N/A'}
                  </td>
                  <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                      booking.status === 'confirmed' ? 'bg-[#eefcf2] text-[#42b872]' : 
                      booking.status === 'pending' ? 'bg-[#fffaeb] text-[#f59e0b]' : 
                      'bg-[#fef3f2] text-[#e0455d]'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 md:px-6 text-sm font-black text-slate-800 text-right whitespace-nowrap">${booking.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Payment Mix & Top Tours (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
        
        {/* Payment Mix (4/12 width) */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-[#f0ecec] p-4 md:p-6 flex flex-col items-center min-h-[450px]">
           <div className="w-full text-left mb-6">
             <h2 className="text-base md:text-lg font-bold text-slate-800 uppercase tracking-tight">Payment Mix</h2>
           </div>
           
           <div className="relative flex-1 w-full flex justify-center items-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {paymentMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800">Mix</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Revenue Share</span>
             </div>
           </div>

           <div className="w-full mt-6 space-y-3">
              {paymentMixData.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                    <span className="font-bold text-slate-700 uppercase text-xs tracking-tight">{item.name || 'Unknown'}</span>
                  </div>
                  <span className="text-slate-800 font-black text-xs">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
           </div>
        </div>

        {/* Top Performing Tours (8/12 width) */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-[#f0ecec] flex flex-col overflow-hidden min-h-[450px]">
          <div className="p-4 md:p-6 border-b border-gray-100 bg-[#fcfaf9]">
            <h2 className="text-base md:text-lg font-bold text-slate-800 uppercase tracking-tight">Top Performing Tours</h2>
          </div>
          
          <div className="p-4 md:p-6 flex-1 overflow-y-auto">
            <div className="space-y-6">
              {stats?.topTours?.map(tour => (
                <div key={tour.tourId} className="flex items-center space-x-5 group">
                  <div className="w-14 h-14 rounded-xl bg-[#faeceb] flex items-center justify-center shadow-sm text-[#7C4A4A] font-black text-lg group-hover:scale-105 transition-transform">
                     {tour.tourName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-slate-800 truncate pr-4 group-hover:text-[#7C4A4A] transition-colors" title={tour.tourName}>
                        {tour.tourName}
                      </h4>
                      <span className="text-sm font-black text-[#7C4A4A] whitespace-nowrap">
                        ${tour.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                       <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-orange-400 rounded-full shadow-sm" 
                           style={{ width: `${Math.min(100, (tour.totalBookings / (stats.totalBookings || 10)) * 100)}%` }}
                         ></div>
                       </div>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                         {tour.totalBookings} {tour.totalBookings === 1 ? 'booking' : 'bookings'}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50/50 border-t border-gray-100">
            <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-[#7C4A4A] hover:text-white hover:border-[#7C4A4A] transition-all shadow-sm">
              Manage All Inventory
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
