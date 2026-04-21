import React from 'react';
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

// Dummy data for charts
const revenueData = [
  { name: 'JAN', value: 300 },
  { name: 'FEB', value: 450 },
  { name: 'MAR', value: 650 },
  { name: 'APR', value: 500 },
  { name: 'MAY', value: 400 },
  { name: 'JUN', value: 550 },
];

const paymentMixData = [
  { name: 'VNPay', value: 68, color: '#7C4A4A' },
  { name: 'PayPal', value: 25, color: '#fca5a5' },
  { name: 'Others', value: 7, color: '#e5e7eb' },
];

const recentBookings = [
  { 
    id: '#TRV-8842', 
    traveler: 'Elena Moore', 
    email: 'elena.m@example.com', 
    initials: 'EM',
    destination: 'Santorini Gold Tour',
    status: 'CONFIRMED',
    statusBg: 'bg-[#eefcf2]',
    statusText: 'text-[#42b872]',
    amount: '$1,250.00'
  },
  { 
    id: '#TRV-8841', 
    traveler: 'Julian Smith', 
    email: 'j.smith@web.com', 
    initials: 'JS',
    destination: 'Kyoto Zen Escape',
    status: 'PENDING',
    statusBg: 'bg-[#fffaeb]',
    statusText: 'text-[#f59e0b]',
    amount: '$3,400.00'
  },
  { 
    id: '#TRV-8840', 
    traveler: 'Liam Hughes', 
    email: 'liam.h@travel.com', 
    initials: 'LH',
    destination: 'Swiss Alps Trek',
    status: 'CANCELLED',
    statusBg: 'bg-[#fef3f2]',
    statusText: 'text-[#e0455d]',
    amount: '$880.00'
  }
];

const topDestinations = [
  { name: 'Santorini Luxury Escape', price: '$2,450', percent: 88, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=100&h=100&fit=crop' },
  { name: 'Kyoto Zen Gardens', price: '$1,900', percent: 75, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&h=100&fit=crop' },
  { name: 'Swiss Summit Trek', price: '$3,120', percent: 45, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=100&h=100&fit=crop' },
];

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="TOTAL REVENUE" 
          value="$842,900.00" 
          icon={Banknote} 
          trend="up" 
          trendValue="+12.5%" 
        />
        <DashboardCard 
          title="TOTAL BOOKINGS" 
          value="1,248" 
          icon={Ticket} 
          trend="up" 
          trendValue="+5.2%" 
        />
        <DashboardCard 
          title="NEW USERS" 
          value="312" 
          icon={Users} 
          trend="down" 
          trendValue="-2.1%" 
        />
        <DashboardCard 
          title="ACTIVE TOURS" 
          value="84" 
          icon={Compass} 
          trend="stable" 
          trendValue="Stable" 
        />
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#f0ecec] p-6 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Revenue Insights</h2>
              <p className="text-sm text-gray-500">Monthly transactional volume for 2024</p>
            </div>
            <select className="bg-gray-100 border-none text-sm font-medium text-slate-700 py-1.5 px-3 rounded-md outline-none">
              <option>Last 6 Months</option>
            </select>
          </div>
          
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 12}} 
                  dy={10}
                />
                <Tooltip cursor={{fill: '#f9f9f9'}}/>
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]} 
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'APR' ? '#7C4A4A' : '#faeceb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart section */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] p-6 h-[400px] flex flex-col items-center">
           <div className="w-full text-left mb-4">
             <h2 className="text-lg font-bold text-slate-800">Payment Mix</h2>
           </div>
           
           <div className="relative flex-1 w-full flex justify-center items-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
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
                <span className="text-2xl font-black text-slate-800">68%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">VNPAY</span>
             </div>
           </div>

           <div className="w-full mt-4 space-y-3">
              {paymentMixData.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="font-semibold text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-gray-500 font-medium">
                    ${item.name === 'VNPay' ? '572.1k' : item.name === 'PayPal' ? '215.4k' : '55.4k'}
                  </span>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* Bottom Row: Table & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#f0ecec] flex flex-col overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
             <h2 className="text-lg font-bold text-slate-800">Recent Bookings</h2>
             <button className="text-xs font-bold text-[#7C4A4A] uppercase tracking-wider hover:underline">
               View All
             </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfaf9]">
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Booking ID</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Traveler</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Destination</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, index) => (
                  <tr key={booking.id} className="border-b border-gray-50 last:border-b-0 hover:bg-[#faf8f7] transition-colors">
                    <td className="py-4 px-6 text-sm font-bold text-slate-800">{booking.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#faeceb] flex items-center justify-center text-[#7C4A4A] text-xs font-bold">
                          {booking.initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-none">{booking.traveler}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{booking.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-600">{booking.destination}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${booking.statusBg} ${booking.statusText}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-800 text-right">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Top Destinations</h2>
          
          <div className="space-y-6 flex-1">
            {topDestinations.map(dest => (
              <div key={dest.name} className="flex items-center space-x-4">
                <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-bold text-slate-800 truncate pr-2">{dest.name}</h4>
                    <span className="text-xs font-bold text-[#7C4A4A]">{dest.price}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                     <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-orange-300 rounded-full" 
                         style={{ width: `${dest.percent}%` }}
                       ></div>
                     </div>
                     <span className="text-[10px] font-bold text-gray-400">{dest.percent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-6 w-full py-3 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-widest hover:bg-gray-50 transition-colors">
            Manage All Inventory
          </button>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
