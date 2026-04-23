import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, AlertCircle, ArrowRight } from 'react-feather';
import { bookApi } from '../api/axiosClient';

const lineKey = (item) => item.cartLineId ?? item.id;

function Checkout({ cart, onRemoveFromCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});

  React.useEffect(() => {
    const initialQuantities = {};
    cart.forEach(item => {
      const key = lineKey(item);
      initialQuantities[key] = item.seats?.length || item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const handleQuantityChange = (key, newQuantity) => {
    if (newQuantity < 1) {
      onRemoveFromCart(key);
    } else {
      setQuantities(prev => ({ ...prev, [key]: newQuantity }));
    }
  };

  const handleRemove = (key) => {
    onRemoveFromCart(key);
  };

  // --- SỬA TẠI ĐÂY: Tính toán tổng tiền dùng ticketPrice ---
  const qtyForLine = (item) => {
    const key = lineKey(item);
    if (item.seats?.length) return item.seats.length;
    return quantities[key] || item.quantity || 1;
  };

  const subtotal = cart.reduce((sum, item) => {
    const qty = qtyForLine(item);
    const price = item.ticketPrice || 0;
    return sum + (price * qty);
  }, 0);

  const shippingFee = subtotal > 0 ? 30000 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingFee + tax;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setError('Giỏ hàng trống!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      const movieIds = cart.flatMap((item) => {
        const qty = qtyForLine(item);
        return Array.from({ length: qty }, () => item.id);
      });

      const bookData = {
        userId: user.id,
        movieIds,
        total: Math.round(total),
        status: 'CREATED'
      };

      const response = await bookApi.post('/api/orders', bookData);

      if (response.data) {
        localStorage.setItem('currentBook', JSON.stringify(response.data));
        localStorage.setItem('bookTotal', total.toString());
        navigate('/payment');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Không thể tạo đơn hàng. Vui lòng thử lại.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <ShoppingCart className="text-brand-green" size={32} />
          <h1 className="text-4xl font-bold text-gray-800">Giỏ hàng</h1>
        </div>
        <p className="text-gray-600">Kiểm tra và thanh toán các mục của bạn</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Hãy thêm một số bộ phim vào giỏ hàng của bạn</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 bg-brand-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            <span>Tiếp tục mua sắm</span>
            <ArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={lineKey(item)} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-light to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">🎬</span>
                  </div>

                  <div className="flex-1">
                    {/* SỬA TẠI ĐÂY: item.name -> item.title */}
                    <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                    {/* SỬA TẠI ĐÂY: item.type -> item.genre */}
                    <p className="text-sm text-gray-600 mb-1">{item.genre}</p>
                    {item.seats?.length > 0 && (
                      <p className="text-sm text-sky-700 font-medium mb-2">
                        Ghế: {item.seats.join(', ')}
                      </p>
                    )}
                    {/* SỬA TẠI ĐÂY: item.price -> item.ticketPrice */}
                    <p className="text-brand-green font-bold text-lg">
                      {(item.ticketPrice || 0).toLocaleString('vi-VN')}₫
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(lineKey(item))}
                      className="text-red-600 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>

                    {item.seats?.length > 0 ? (
                      <span className="text-sm font-medium text-gray-600">
                        {item.seats.length} vé (theo ghế đã chọn)
                      </span>
                    ) : (
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(lineKey(item), (quantities[lineKey(item)] || 1) - 1)}
                          className="px-3 py-1 text-gray-600 hover:text-brand-green"
                        >
                          −
                        </button>
                        <span className="px-4 font-semibold text-gray-800 min-w-[50px] text-center">
                          {quantities[lineKey(item)] || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(lineKey(item), (quantities[lineKey(item)] || 1) + 1)}
                          className="px-3 py-1 text-gray-600 hover:text-brand-green"
                        >
                          +
                        </button>
                      </div>
                    )}

                    <p className="font-bold text-gray-800">
                      {((item.ticketPrice || 0) * qtyForLine(item)).toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Chi tiết đơn hàng</h2>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Phí giao hàng:</span>
                  <span className="font-semibold">{shippingFee.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Thuế (8%):</span>
                  <span className="font-semibold">{Math.round(tax).toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Tổng cộng:</span>
                <span className="text-3xl font-bold text-brand-green">
                  {Math.round(total).toLocaleString('vi-VN')}₫
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-brand-green text-white py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Đang tạo đơn hàng...' : 'Tiến hành thanh toán'}</span>
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;