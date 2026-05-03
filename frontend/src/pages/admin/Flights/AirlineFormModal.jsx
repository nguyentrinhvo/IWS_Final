import React, { useState, useEffect } from 'react';
import AdminModal from '../../../components/admin/AdminModal';

const EMPTY = { name: '', code: '', country: '', status: 'Active' };

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls =
  'w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] focus:ring-1 focus:ring-[#7C4A4A]/20 transition-all';

const AirlineFormModal = ({ isOpen, onClose, onSave, initial }) => {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(initial ? { ...initial } : { ...EMPTY });
  }, [initial, isOpen]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isEdit = Boolean(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.code.trim() || !form.country.trim()) return;
    onSave({ ...form, id: initial?.id ?? Date.now() });
    onClose();
  };

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Airline' : 'Add Airline'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Airline Name">
          <input
            className={inputCls}
            placeholder="e.g. Vietnam Airlines"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="IATA Code">
            <input
              className={inputCls}
              placeholder="e.g. VN"
              value={form.code}
              onChange={(e) => set('code', e.target.value.toUpperCase())}
              maxLength={3}
              required
            />
          </Field>
          <Field label="Country">
            <input
              className={inputCls}
              placeholder="e.g. Vietnam"
              value={form.country}
              onChange={(e) => set('country', e.target.value)}
              required
            />
          </Field>
        </div>

        <Field label="Status">
          <select
            className={inputCls}
            value={form.status}
            onChange={(e) => set('status', e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-lg bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-sm font-bold shadow-md transition-all active:scale-95"
          >
            {isEdit ? 'Save Changes' : 'Add Airline'}
          </button>
        </div>
      </form>
    </AdminModal>
  );
};

export default AirlineFormModal;
