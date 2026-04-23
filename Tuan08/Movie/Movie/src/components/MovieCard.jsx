import React from 'react';
import { Monitor, Plus, Minus, Edit2 } from 'react-feather';

function MovieCard({ movie, onChooseMovie, onAddToCart, onEdit, showQuantity = false, quantity = 1, onQuantityChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="w-full h-40 bg-gradient-to-br from-brand-light to-green-100 flex items-center justify-center">
        <span className="text-6xl">🎬</span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title - Sửa từ movie.name thành movie.title */}
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
            {movie.title || "Không có tên"}
        </h3>

        {/* Type and Availability */}
        <div className="flex justify-between items-center mb-3">
          {/* Genre - Sửa từ movie.type thành movie.genre */}
          <span className="text-sm bg-brand-light text-brand-green px-3 py-1 rounded-full font-medium">
            {movie.genre || "Chưa phân loại"}
          </span>
          {/* Vì backend chưa có availableQty, mình để mặc định là "Còn vé" hoặc số lượng giả định */}
          <span className="text-xs text-gray-600">
            Trạng thái: <span className="font-semibold text-brand-green">Còn vé</span>
          </span>
        </div>

        {/* Price - Sửa quan trọng: movie.price thành movie.ticketPrice */}
        <div className="text-2xl font-bold text-brand-green mb-4">
          {(movie.ticketPrice || 0).toLocaleString('vi-VN')}₫
        </div>

        {/* Action Buttons */}
        {showQuantity ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="p-2 text-gray-600 hover:text-brand-green transition"
              >
                <Minus size={18} />
              </button>
              <span className="px-4 font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="p-2 text-gray-600 hover:text-brand-green transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(movie)}
                className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition flex items-center justify-center space-x-2 font-medium"
              >
                <Edit2 size={18} />
                <span>Sửa</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => (onChooseMovie ? onChooseMovie(movie) : onAddToCart?.(movie))}
              className="w-full bg-brand-green text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              <Monitor size={20} />
              <span>Chọn phim</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;