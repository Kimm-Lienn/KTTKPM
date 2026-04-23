import { movieApi } from '../api/axiosClient';

export const movieService = {
  // Lấy tất cả phim
  getAllMovies: async () => {
    try {
      const response = await movieApi.get('/api/movies');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy phim theo ID
  getMovieById: async (id) => {
    try {
      const response = await movieApi.get(`/api/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lọc phim theo thể loại
  getMoviesByType: async (type) => {
    try {
      const response = await movieApi.get(`/api/movies?type=${type}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy danh sách thể loại phim
  getMovieTypes: async () => {
    try {
      const response = await movieApi.get('/api/movies/types');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
