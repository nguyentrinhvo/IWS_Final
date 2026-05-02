import React from 'react';

const RoomCard = ({ room, onSelect, isSelected }) => {
  return (
    <div className={`bg-white rounded-3xl border-2 transition-all overflow-hidden ${isSelected ? 'border-[#7978E9] shadow-lg shadow-[#7978E9]/10' : 'border-gray-100 hover:border-gray-200 shadow-sm'}`}>
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="md:w-80 h-56 md:h-auto overflow-hidden">
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-bold text-[#1a2b49]">{room.name}</h4>
              <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Up to {room.capacity} guests
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">🛏️</span>
                {room.bedType}
              </div>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <span className="mr-2">✨</span>
                Free Cancellation
              </div>
              <div className="flex items-center text-sm text-[#7978E9] font-medium">
                <span className="mr-2">🍳</span>
                Breakfast Included
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 list-disc list-inside">
              <li>{room.size} sqm</li>
              <li>Garden View</li>
              <li>Minibar</li>
              <li>Private Terrace</li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Price per night</p>
              <p className="text-2xl font-black text-[#1a2b49]">{room.price.toLocaleString()} VND</p>
            </div>
            <button 
              onClick={() => onSelect(room)}
              className={`font-bold py-3 px-8 rounded-2xl shadow-md transition-all active:scale-[0.98] ${isSelected ? 'bg-green-500 text-white' : 'bg-[#CD6F1E] hover:bg-[#b8631b] text-white'}`}
            >
              {isSelected ? 'Selected' : 'Select Room'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
