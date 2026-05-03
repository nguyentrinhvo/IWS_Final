import React, { useState, useEffect } from 'react';
import AdminModal from '../../../components/admin/AdminModal';

const EMPTY = { 
  operatorName: '', 
  vehicleType: 'Bus', 
  departureCity: '', 
  arrivalCity: '', 
  departureTime: '', 
  arrivalTime: '', 
  price: '', 
  totalSeats: '',
  vehicleClass: 'Standard'
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
    if (initial) {
      setForm({
        operatorName: initial.operatorName || '',
        vehicleType: initial.vehicleType || 'Bus',
        departureCity: initial.departureCity || '',
        arrivalCity: initial.arrivalCity || '',
        departureTime: initial.departureTime ? new Date(initial.departureTime).toISOString().slice(0, 16) : '',
        arrivalTime: initial.arrivalTime ? new Date(initial.arrivalTime).toISOString().slice(0, 16) : '',
        price: initial.price || '',
        totalSeats: initial.totalSeats || '',
        vehicleClass: initial.vehicleClass || 'Standard'
      });
    } else {
      setForm({ ...EMPTY, operatorName: providers[0]?.name || '' });
    }
  }, [initial, isOpen, providers]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isEdit = Boolean(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: initial?.id });
    onClose();
  };

  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Route' : 'Add Route'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Provider/Operator">
            <select
              className={inputCls}
              value={form.operatorName}
              onChange={(e) => set('operatorName', e.target.value)}
              required
            >
              <option value="">Select a provider</option>
              {providers.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Transport Type">
            <select
              className={inputCls}
              value={form.vehicleType}
              onChange={(e) => set('vehicleType', e.target.value)}
            >
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Departure City">
            <input
              className={inputCls}
              placeholder="e.g. Hanoi"
              value={form.departureCity}
              onChange={(e) => set('departureCity', e.target.value)}
              required
            />
          </Field>
          <Field label="Arrival City">
            <input
              className={inputCls}
              placeholder="e.g. Da Nang"
              value={form.arrivalCity}
              onChange={(e) => set('arrivalCity', e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Departure Time">
            <input
              type="datetime-local"
              className={inputCls}
              value={form.departureTime}
              onChange={(e) => set('departureTime', e.target.value)}
              required
            />
          </Field>
          <Field label="Arrival Time">
            <input
              type="datetime-local"
              className={inputCls}
              value={form.arrivalTime}
              onChange={(e) => set('arrivalTime', e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
