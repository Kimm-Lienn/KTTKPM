import { movieApi } from '../api/axiosClient';

export const movieService = {
  // Lay tat ca phim
  getAllMovies: async () => {
    try {
      const response = await movieApi.get('/api/movies');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lay phim theo ID
  getMovieById: async (id) => {
    try {
      const response = await movieApi.get(`/api/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Loc phim theo the loai
  getMoviesByType: async (type) => {
    try {
      const response = await movieApi.get(`/api/movies?type=${type}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lay danh sach the loai phim
  getMovieTypes: async () => {
    try {
      const response = await movieApi.get('/api/movies/types');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
