import React, { useState, useEffect } from 'react';
import { movieApi } from '../api/axiosClient';
import { Edit2, Trash2, Check, X } from 'react-feather';

function MovieManager() {
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', genre: '', ticketPrice: 0 });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const res = await movieApi.get('/api/movies');
      setMovies(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách phim", err);
    }
  };

  const startEdit = (movie) => {
    setEditingId(movie.id);
    setEditForm({ title: movie.title, genre: movie.genre, ticketPrice: movie.ticketPrice });
  };

  const handleUpdate = async (id) => {
    try {
      await movieApi.put(`/api/movies/${id}`, editForm);
      setEditingId(null);
      loadMovies();
      alert("Cập nhật thành công!");
    } catch (err) {
      alert("Cập nhật thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        await movieApi.delete(`/api/movies/${id}`);
        loadMovies();
        alert("Xóa thành công!");
      } catch (err) {
        alert("Lỗi: Backend chưa có hàm @DeleteMapping hoặc lỗi kết nối!");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-brand-green p-6 text-white">
          <h2 className="text-2xl font-bold">Hệ Thống Quản Lý Phim</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Tên phim</th>
                <th className="p-4 font-semibold text-gray-700">Thể loại</th>
                <th className="p-4 font-semibold text-gray-700">Giá vé (VNĐ)</th>
                <th className="p-4 font-semibold text-gray-700 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="border-b hover:bg-gray-50 transition">
                  {/* Cột Tên phim */}
                  <td className="p-4">
                    {editingId === movie.id ? (
                      <input 
                        className="w-full border-2 border-blue-400 rounded px-2 py-1 outline-none"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      />
                    ) : (movie.title)}
                  </td>

                  {/* Cột Thể loại */}
                  <td className="p-4">
                    {editingId === movie.id ? (
                      <input 
                        className="w-full border-2 border-blue-400 rounded px-2 py-1 outline-none"
                        value={editForm.genre}
                        onChange={(e) => setEditForm({...editForm, genre: e.target.value})}
                      />
                    ) : (movie.genre)}
                  </td>

                  {/* Cột Giá vé */}
                  <td className="p-4">
                    {editingId === movie.id ? (
                      <input 
                        type="number"
                        className="w-full border-2 border-blue-400 rounded px-2 py-1 outline-none"
                        value={editForm.ticketPrice}
                        onChange={(e) => setEditForm({...editForm, ticketPrice: e.target.value})}
                      />
                    ) : (movie.ticketPrice?.toLocaleString())}
                  </td>

                  {/* Cột Nút bấm HÀNH ĐỘNG */}
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      {editingId === movie.id ? (
                        // CÁC NÚT KHI ĐANG SỬA
                        <>
                          <button 
                            onClick={() => handleUpdate(movie.id)}
                            className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                          >
                            <Check size={16} /> Lưu
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                          >
                            <X size={16} /> Hủy
                          </button>
                        </>
                      ) : (
                        // CÁC NÚT KHI Ở CHẾ ĐỘ XEM BÌNH THƯỜNG
                        <>
                          <button 
                            onClick={() => startEdit(movie)}
                            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                          >
                            <Edit2 size={16} /> Sửa
                          </button>
                          <button 
                            onClick={() => handleDelete(movie.id)}
                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            <Trash2 size={16} /> Xóa
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MovieManager;