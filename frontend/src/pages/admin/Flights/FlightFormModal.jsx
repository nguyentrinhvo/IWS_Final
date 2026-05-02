import React, { useState, useEffect } from 'react';
import AdminModal from '../../../components/admin/AdminModal';

const EMPTY = {
  so_hieu: '',
  hang_bay: '',
  diem_di: '',
  diem_den: '',
  gio_di: '',
  gio_den: '',
  hang_ve: 'Economy',
  gia: '',
  so_cho_con: '',
};

const inputCls =
  'w-full px-4 py-2.5 bg-[#fafafa] border border-gray-200 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] focus:ring-1 focus:ring-[#7C4A4A]/20 transition-all';

const Field = ({ label, children, half }) => (
  <div className={`flex flex-col gap-1.5 ${half ? '' : ''}`}>
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const FlightFormModal = ({ isOpen, onClose, onSave, initial, airlines }) => {
  const [form, setForm] = useState({ ...EMPTY });

  useEffect(() => {
    setForm(initial ? { ...initial } : { ...EMPTY });
  }, [initial, isOpen]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isEdit = Boolean(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: initial?.id ?? Date.now(),
      gia: Number(form.gia),
      so_cho_con: Number(form.so_cho_con),
    });
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Flight' : 'Add Flight'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Flight Number">
            <input
              className={inputCls}
              placeholder="e.g. VN-201"
              value={form.so_hieu}
              onChange={(e) => set('so_hieu', e.target.value)}
              required
            />
          </Field>
          <Field label="Airline">
            <select
              className={inputCls}
              value={form.hang_bay}
              onChange={(e) => set('hang_bay', e.target.value)}
              required
            >
              <option value="">Select airline…</option>
              {airlines.map((a) => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="From (Origin)">
            <input
              className={inputCls}
              placeholder="e.g. Hanoi (HAN)"
              value={form.diem_di}
              onChange={(e) => set('diem_di', e.target.value)}
              required
            />
          </Field>
          <Field label="To (Destination)">
            <input
              className={inputCls}
              placeholder="e.g. Ho Chi Minh (SGN)"
              value={form.diem_den}
              onChange={(e) => set('diem_den', e.target.value)}
              required
            />
          </Field>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Departure Time">
            <input
              type="datetime-local"
              className={inputCls}
              value={form.gio_di}
              onChange={(e) => set('gio_di', e.target.value)}
              required
            />
          </Field>
          <Field label="Arrival Time">
            <input
              type="datetime-local"
              className={inputCls}
              value={form.gio_den}
              onChange={(e) => set('gio_den', e.target.value)}
              required
            />
          </Field>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-3 gap-4">
          <Field label="Class">
            <select
              className={inputCls}
              value={form.hang_ve}
              onChange={(e) => set('hang_ve', e.target.value)}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </Field>
          <Field label="Price (VND)">
            <input
              type="number"
              className={inputCls}
              placeholder="e.g. 1200000"
              value={form.gia}
              onChange={(e) => set('gia', e.target.value)}
              min={0}
              required
            />
          </Field>
          <Field label="Available Seats">
            <input
              type="number"
              className={inputCls}
              placeholder="e.g. 120"
              value={form.so_cho_con}
              onChange={(e) => set('so_cho_con', e.target.value)}
              min={0}
              required
            />
          </Field>
        </div>

        {/* Actions */}
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
            {isEdit ? 'Save Changes' : 'Add Flight'}
          </button>
        </div>
      </form>
    </AdminModal>
  );
};

export default FlightFormModal;
