import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle, Filter, X } from 'react-feather';
import MovieCard from '../components/MovieCard';
import SeatPickerModal from '../components/SeatPickerModal';
import { movieApi } from '../api/axiosClient';

function Home({ onAddToCart }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', genre: '', ticketPrice: '' });
  const [seatPickerMovie, setSeatPickerMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const loadMovieList = async () => {
    const response = await movieApi.get('/api/movies');
    setMovies(response.data);
    const uniqueTypes = [...new Set(response.data.map(movie => movie.genre))];
    setTypes(uniqueTypes);
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError('');
      await loadMovieList();
    } catch (err) {
      setError('Không thể tải danh sách phim. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = selectedType
  ? movies.filter(movie => movie.genre === selectedType)
  : movies;

  const openEditMovie = (movie) => {
    setEditMovie(movie);
    setEditForm({
      title: movie.title ?? '',
      genre: movie.genre ?? '',
      ticketPrice: movie.ticketPrice ?? ''
    });
  };

  const closeEditMovie = () => {
    setEditMovie(null);
  };

  const saveEditMovie = async () => {
    if (!editMovie) return;
    try {
      await movieApi.put(`/api/movies/${editMovie.id}`, {
        title: editForm.title,
        genre: editForm.genre,
        ticketPrice: Number(editForm.ticketPrice)
      });
      await loadMovieList();
      closeEditMovie();
      alert('Cập nhật thành công!');
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🎬 Danh Sách Phim</h1>
        <p className="text-gray-600">Khám phá những bộ phim hấp dẫn nhất tại Movie</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={fetchMovies}
              className="text-red-600 underline text-sm mt-2 hover:text-red-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* Filter */}
      {types.length > 0 && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} className="text-brand-green" />
            <span className="font-semibold text-gray-700">Lọc theo loại:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !selectedType
                  ? 'bg-brand-green text-white'
                  : 'bg-brand-light text-brand-green hover:bg-green-100'
              }`}
            >
              Tất cả
            </button>
            {types.map(type => (
                  <button
                    key={type} // Bây giờ type đã có giá trị (ví dụ: "Hành động") nên key sẽ duy nhất
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedType === type
                        ? 'bg-brand-green text-white'
                        : 'bg-brand-light text-brand-green hover:bg-green-100'
                    }`}
                  >
    {type}
  </button>
))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="animate-spin text-brand-green mb-4" size={40} />
          <p className="text-gray-600 font-medium">Đang tải menu...</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            {selectedType ? 'Không có phim nào trong thể loại này' : 'Chưa có phim nào'}
          </p>
        </div>
      ) : (
        <>
          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onChooseMovie={(m) => setSeatPickerMovie(m)}
                onAddToCart={onAddToCart}
                onEdit={openEditMovie}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-700">
              Đang hiển thị <span className="font-bold text-brand-green">{filteredMovies.length}</span> trong <span className="font-bold text-brand-green">{movies.length}</span> phim
            </p>
          </div>
        </>
      )}

      {seatPickerMovie && (
        <SeatPickerModal
          movie={seatPickerMovie}
          onClose={() => setSeatPickerMovie(null)}
          onConfirm={(seats) => {
            onAddToCart({
              ...seatPickerMovie,
              seats,
              quantity: seats.length
            });
            setSeatPickerMovie(null);
          }}
        />
      )}

      {editMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              type="button"
              onClick={closeEditMovie}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Đóng"
            >
              <X size={22} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pr-8">Sửa phim</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên phim</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                  value={editForm.genre}
                  onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá vé (VNĐ)</label>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                  value={editForm.ticketPrice}
                  onChange={(e) => setEditForm({ ...editForm, ticketPrice: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={saveEditMovie}
                className="flex-1 bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 font-medium"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={closeEditMovie}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 font-medium"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
