import React from 'react';

const AdminTable = ({ columns = [], children, emptyMessage = 'No records found.', minWidth = '' }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden">
      <div className="overflow-x-auto">
        <table className={`w-full text-left border-collapse ${minWidth}`}>
          <thead>
            <tr className="bg-[#fcfaf9]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {children}
            {(!children || (Array.isArray(children) && children.length === 0) || React.Children.count(children) === 0) && (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center text-sm text-gray-400 font-semibold">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
