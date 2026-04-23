import React, { useMemo, useState } from 'react';
import { X } from 'react-feather';

const ROWS = 'ABCDEFGH'.split('');
const COLS = 12;
/** Ghế demo đã có người đặt */
const OCCUPIED = new Set(['D5', 'D6', 'E5', 'E6', 'F10', 'C8']);

function seatId(row, col) {
  return `${row}${col}`;
}

function SeatPickerModal({ movie, onClose, onConfirm }) {
  const [selected, setSelected] = useState(() => new Set());

  const toggleSeat = (id) => {
    if (OCCUPIED.has(id)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const seatsArray = useMemo(() => [...selected].sort(), [selected]);

  const handleConfirm = () => {
    if (seatsArray.length === 0) return;
    onConfirm(seatsArray);
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
          aria-label="Đóng"
        >
          <X size={22} />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 pr-10">Chọn ghế</h2>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold text-brand-green">{movie.title}</span>
            {' · '}
            {(movie.ticketPrice || 0).toLocaleString('vi-VN')}₫ / ghế
          </p>

          {/* Màn hình */}
          <div className="mb-8">
            <div className="mx-auto max-w-xl rounded-t-lg bg-gradient-to-b from-gray-800 to-gray-900 text-center py-3 px-6 shadow-inner">
              <p className="text-sm font-medium tracking-widest text-gray-300 uppercase">Màn hình</p>
            </div>
            <div className="mx-auto max-w-xl h-2 rounded-b-lg bg-gray-300/80" />
          </div>

          {/* Chú thích */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-700">
            <span className="flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-md border-2 border-gray-300 bg-white" /> Trống
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-md border-2 border-brand-green bg-brand-light" /> Đang chọn
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-md border-2 border-gray-400 bg-gray-200" /> Đã đặt
            </span>
          </div>

          {/* Cột số */}
          <div className="flex justify-center mb-2 pl-10 sm:pl-12">
            <div className="flex gap-1 sm:gap-1.5">
              {Array.from({ length: COLS }, (_, i) => (
                <span
                  key={i}
                  className="w-7 h-6 sm:w-8 text-center text-xs font-semibold text-gray-500 flex items-center justify-center"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          {/* Lưới ghế */}
          <div className="flex flex-col items-center gap-2 mb-8">
            {ROWS.map((row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="w-6 sm:w-8 text-center text-sm font-bold text-gray-600">{row}</span>
                <div className="flex gap-1 sm:gap-1.5">
                  {Array.from({ length: COLS }, (_, i) => {
                    const col = i + 1;
                    const id = seatId(row, col);
                    const taken = OCCUPIED.has(id);
                    const isSel = selected.has(id);
                    const aisleAfter = col === 4 || col === 10;
                    return (
                      <span key={id} className="inline-flex items-center gap-1 sm:gap-1.5">
                        <button
                          type="button"
                          disabled={taken}
                          onClick={() => toggleSeat(id)}
                          title={id}
                          className={[
                            'w-7 h-7 sm:w-8 sm:h-8 rounded-md text-xs font-semibold transition border-2',
                            taken
                              ? 'border-gray-400 bg-gray-200 text-gray-400 cursor-not-allowed'
                              : isSel
                                ? 'border-brand-green bg-brand-light text-brand-green scale-105 shadow'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-brand-green/60 hover:bg-green-50'
                          ].join(' ')}
                        >
                          {col}
                        </button>
                        {aisleAfter && col < COLS ? (
                          <span className="w-1 sm:w-2 shrink-0" aria-hidden />
                        ) : null}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 mb-6">
            <p className="text-gray-800">
              <span className="font-semibold">Ghế đã chọn:</span>{' '}
              {seatsArray.length ? seatsArray.join(', ') : 'Chưa chọn ghế nào'}
            </p>
            <p className="text-brand-green font-bold mt-2">
              Tạm tính:{' '}
              {((movie.ticketPrice || 0) * seatsArray.length).toLocaleString('vi-VN')}₫
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={seatsArray.length === 0}
              className="px-5 py-2.5 rounded-lg bg-brand-green text-white font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Thêm vào giỏ ({seatsArray.length} ghế)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatPickerModal;
