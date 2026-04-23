import { bookApi } from '../api/axiosClient';

export const bookService = {
  // Tạo đơn hàng mới
  createBook: async (userId, movieIds, total) => {
    try {
      const response = await bookApi.post('/api/orders', {
        userId,
        movieIds,
        total,
        status: 'CREATED'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy đơn hàng theo ID
  getBookById: async (id) => {
    try {
      const response = await bookApi.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Lấy tất cả đơn hàng của người dùng
  getUserBooks: async (userId) => {
    try {
      const response = await bookApi.get(`/api/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật status đơn hàng
  updateBookStatus: async (id, status) => {
    try {
      const response = await bookApi.patch(`/api/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
