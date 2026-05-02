import React, { useState, useEffect } from 'react';
import AdminModal from '../../../components/admin/AdminModal';

const EMPTY = { 
  provider: '', 
  type: 'Bus', 
  from: '', 
  to: '', 
  depTime: '', 
  arrTime: '', 
  price: '', 
  totalSeats: '', 
  availSeats: '' 
};

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls =
  'w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] focus:ring-1 focus:ring-[#7C4A4A]/20 transition-all';

const RouteFormModal = ({ isOpen, onClose, onSave, initial, providers = [] }) => {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(initial ? { ...initial } : { ...EMPTY, provider: providers[0]?.name || '' });
  }, [initial, isOpen, providers]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isEdit = Boolean(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: initial?.id ?? Date.now() });
    onClose();
  };

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Route' : 'Add Route'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Provider">
            <select
              className={inputCls}
              value={form.provider}
              onChange={(e) => set('provider', e.target.value)}
              required
            >
              {providers.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Transport Type">
            <select
              className={inputCls}
              value={form.type}
              onChange={(e) => set('type', e.target.value)}
            >
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="From">
            <input
              className={inputCls}
              placeholder="e.g. Hanoi"
              value={form.from}
              onChange={(e) => set('from', e.target.value)}
              required
            />
          </Field>
          <Field label="To">
            <input
              className={inputCls}
              placeholder="e.g. Da Nang"
              value={form.to}
              onChange={(e) => set('to', e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Departure Time">
            <input
              type="time"
              className={inputCls}
              value={form.depTime}
              onChange={(e) => set('depTime', e.target.value)}
              required
            />
          </Field>
          <Field label="Arrival Time">
            <input
              type="time"
              className={inputCls}
              value={form.arrTime}
              onChange={(e) => set('arrTime', e.target.value)}
              required
            />
          </Field>
        </div>

        <Field label="Price (VND)">
          <input
            type="number"
            className={inputCls}
            placeholder="e.g. 450000"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            required
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Total Seats">
            <input
              type="number"
              className={inputCls}
              placeholder="e.g. 40"
              value={form.totalSeats}
              onChange={(e) => set('totalSeats', e.target.value)}
              required
            />
          </Field>
          <Field label="Available Seats">
            <input
              type="number"
              className={inputCls}
              placeholder="e.g. 12"
              value={form.availSeats}
              onChange={(e) => set('availSeats', e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="flex gap-3 pt-4">
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
            {isEdit ? 'Save Changes' : 'Add Route'}
          </button>
        </div>
      </form>
    </AdminModal>
  );
};

export default RouteFormModal;
