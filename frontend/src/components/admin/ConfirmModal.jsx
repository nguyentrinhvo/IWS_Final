import React from 'react';
import { AlertTriangle } from 'lucide-react';
import AdminModal from './AdminModal';

/**
 * ConfirmModal – generic delete/action confirmation dialog.
 * Props:
 *   isOpen   : boolean
 *   onClose  : () => void
 *   onConfirm: () => void
 *   message  : string
 *   confirmLabel : string  (default: 'Delete')
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message = 'Are you sure you want to delete this item?',
  confirmLabel = 'Delete',
}) => (
  <AdminModal isOpen={isOpen} onClose={onClose} title="Confirm Action" size="sm">
    <div className="flex flex-col items-center text-center gap-4 py-2">
      <div className="w-14 h-14 rounded-full bg-[#fef3f2] flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-[#e0455d]" />
      </div>
      <p className="text-sm font-semibold text-slate-700 leading-relaxed">{message}</p>
    </div>

    <div className="flex gap-3 mt-6">
      <button
        onClick={onClose}
        className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
      >
        Cancel
      </button>
      <button
        onClick={() => { onConfirm(); onClose(); }}
        className="flex-1 py-2.5 rounded-lg bg-[#e0455d] hover:bg-[#c93a50] text-white text-sm font-bold transition-all shadow-md active:scale-95"
      >
        {confirmLabel}
      </button>
    </div>
  </AdminModal>
);

export default ConfirmModal;
