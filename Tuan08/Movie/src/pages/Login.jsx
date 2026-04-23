import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather';
import { userApi } from '../api/axiosClient';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sửa Regex đơn giản hơn: Chỉ cần 3 ký tự trở lên, không bắt buộc cả số và chữ hoa
  const usernameRegex = /^[A-Za-z\d]{3,}$/;
  const passwordRegex = /^.{3,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let newErrors = { ...errors };
    if (name === 'username') {
      if (!usernameRegex.test(value)) {
        newErrors.username = 'Username tối thiểu 3 ký tự';
      } else delete newErrors.username;
    }

    if (name === 'password') {
      if (!passwordRegex.test(value)) {
        newErrors.password = 'Mật khẩu quá ngắn';
      } else delete newErrors.password;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Nếu vẫn còn lỗi validate thì không cho gửi
    if (Object.keys(errors).length > 0 || !formData.username || !formData.password) {
      alert("Vui lòng nhập đúng định dạng!");
      return;
    }

    setLoading(true);
    try {
      // Gọi đúng endpoint /users/login như trong Backend
      const res = await userApi.post('/users/login', formData);

      if (res.data) {
        console.log("Đăng nhập thành công:", res.data);
        onLogin(res.data);
        navigate('/');
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      alert(err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              placeholder="Nhập username..."
              value={formData.username}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu..."
                className={`w-full pr-10 p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition duration-200 disabled:bg-gray-400"
          >
            {loading ? 'Đang kết nối...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <span 
            className="text-green-600 font-bold cursor-pointer hover:underline" 
            onClick={() => navigate('/register')}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;