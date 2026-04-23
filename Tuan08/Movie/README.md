# Movie Frontend

Frontend application cho hệ thống Movie với theme trắng xanh lá cây.

## 🎨 Features

- ✅ Theme xanh lá cây - Trắng hiện đại
- ✅ Đăng nhập và xác thực người dùng
- ✅ Duyệt danh sách phim với lọc theo thể loại
- ✅ Giỏ hàng với quản lý số lượng
- ✅ Thanh toán với 2 phương thức (Ngân hàng / COD)
- ✅ Điều hướng nhanh và giao diện responsive
- ✅ Tích hợp với 4 Microservices backend

## 🛠 Tech Stack

- **React 18** - UI Framework
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Feather** - Icons

## 📋 Prerequisites

- Node.js 14+ 
- npm hoặc yarn

## 🚀 Installation & Setup

### 1. Cài đặt Dependencies

```bash
npm install
```

### 2. Cấu hình Environment Variables

Tạo file `.env` trong thư mục root:

```env
# UserService - Quản lý người dùng
REACT_APP_IP_USER=http://localhost:8001

# MovieService - Danh sách phim
REACT_APP_MOVIE_API=http://localhost:8002

# BookService - Quản lý đơn hàng
REACT_APP_IP_BOOK=http://localhost:8003

# PaymentService - Quản lý thanh toán
REACT_APP_IP_PAYMENT=http://localhost:8004
```

### 3. Chạy Development Server

```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

## 📂 Project Structure

```
src/
├── api/
│   └── axiosClient.js          # Axios instances cho 4 services
├── components/
│   ├── Navbar.jsx              # Navigation bar component
│   └── MovieCard.jsx           # Movie item card component
├── pages/
│   ├── Login.jsx               # Trang đăng nhập
│   ├── Home.jsx                # Trang danh sách phim
│   ├── Checkout.jsx            # Trang giỏ hàng
│   └── Payment.jsx             # Trang thanh toán
├── App.js                      # Main component với routing
└── index.js                    # Entry point

public/
└── index.html                  # HTML template

tailwind.config.js              # Tailwind CSS configuration
postcss.config.js               # PostCSS configuration
index.css                       # Global styles
package.json                    # Dependencies
```

## 🎯 Color Scheme (Trắng - Xanh Lá Cây)

- **Primary Green** (`#16a34a`): Buttons, Links, Accents
- **Light Green** (`#f0fdf4`): Backgrounds, Light elements
- **White** (`#ffffff`): Main background, Cards

## 📱 Pages Overview

### 🔐 Login Page
- Đăng nhập bằng username và password
- Kết nối đến UserService
- Demo credentials: `user123` / `pass123`

### 🏠 Home Page
- Hiển thị danh sách phim từ MovieService
- Lọc theo thể loại
- Thêm vào giỏ hàng với một click
- Responsive grid view

### 🛒 Checkout Page
- Xem chi tiết giỏ hàng
- Điều chỉnh số lượng từng mục
- Tính toán tổng tiền (Tạm tính + Phí giao + Thuế)
- Tạo đơn hàng qua BookService

### 💳 Payment Page
- Chọn phương thức thanh toán (Ngân hàng / COD)
- Nhập thông tin thẻ (cho ngân hàng)
- Xác nhận thanh toán qua PaymentService
- Hiển thị kết quả thành công

## 🔌 API Endpoints

### UserService
```
POST /api/users/login          # Đăng nhập
```

### MovieService
```
GET /api/movies                # Lấy danh sách phim
```

### BookService
```
POST /api/orders               # Tạo đơn hàng
PATCH /api/orders/:id          # Cập nhật status đơn hàng
```

### PaymentService
```
POST /api/payments             # Tạo thanh toán
```

## 📝 Demo Data Flow

1. User đăng nhập → UserService trả về user info
2. Xem danh sách phim → MovieService cung cấp movies
3. Thêm vào giỏ hàng → Lưu trữ ở localStorage
4. Thanh toán → BookService tạo book, PaymentService xử lý payment

## 🌐 Environment Setup

Đảm bảo các services Java chạy trên các cổng:
- UserService: `http://localhost:8001`
- MovieService: `http://localhost:8002`
- BookService: `http://localhost:8003`
- PaymentService: `http://localhost:8004`

## 📦 Build for Production

```bash
npm run build
```

Tạo thư mục `build/` với optimized production build.

## 🐛 Troubleshooting

**CORS Error?**
- Kiểm tra Backend có enable CORS không
- Kiểm tra URL trong `.env` có chính xác không

**Axios Connection Failed?**
- Kiểm tra Services backend có chạy không
- Verify port numbers trong `.env`

**Styling không apply?**
- Chạy `npm install` lại
- Clear browser cache

## 📄 License

MIT

## 👨‍💻 Author

Movie Team
