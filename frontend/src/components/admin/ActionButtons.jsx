import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onEdit}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-[#7C4A4A] bg-[#faeceb] hover:bg-[#f5dada] transition-all active:scale-95"
    >
      <Pencil size={13} />
      Edit
    </button>
    <button
      onClick={onDelete}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-[#e0455d] bg-[#fef3f2] hover:bg-[#fde0e4] transition-all active:scale-95"
    >
      <Trash2 size={13} />
      Delete
    </button>
  </div>
);

export default ActionButtons;
