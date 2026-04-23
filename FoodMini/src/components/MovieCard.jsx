import React from 'react';
import { ShoppingCart, Plus, Minus } from 'react-feather';

function MovieCard({ movie, onAddToCart, showQuantity = false, quantity = 1, onQuantityChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Poster */}
      <div className="w-full h-40 bg-gradient-to-br from-brand-light to-green-100 flex items-center justify-center">
        <span className="text-6xl">🎬</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">{movie.name}</h3>

        <div className="flex justify-between items-center mb-3">
          <span className="text-sm bg-brand-light text-brand-green px-3 py-1 rounded-full font-medium">
            {movie.type}
          </span>
          <span className="text-xs text-gray-600">
            Còn suất: <span className="font-semibold text-brand-green">{movie.availableQty}</span>
          </span>
        </div>

        <div className="text-2xl font-bold text-brand-green mb-4">
          {movie.price.toLocaleString('vi-VN')}₫
        </div>

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
          <button
            onClick={() => onAddToCart(movie)}
            disabled={movie.availableQty === 0}
            className="w-full bg-brand-green text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            <ShoppingCart size={20} />
            <span>Đặt vé</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
