import axios from 'axios';

const apiConfig = {
  user: process.env.REACT_APP_USER_API,
  movie: process.env.REACT_APP_MOVIE_API,
  book: process.env.REACT_APP_BOOK_API || process.env.REACT_APP_ORDER_API,
  payment: process.env.REACT_APP_PAYMENT_API
};

// Tạo các instance riêng biệt cho từng service
export const userApi = axios.create({ 
  baseURL: apiConfig.user,
  headers: { 'Content-Type': 'application/json' }
});

export const movieApi = axios.create({ 
  baseURL: apiConfig.movie
});

export const bookApi = axios.create({ 
  baseURL: apiConfig.book 
});

export const paymentApi = axios.create({ 
  baseURL: apiConfig.payment 
});