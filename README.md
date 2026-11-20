# Travel Booking Platform — Hệ Thống Đặt Dịch Vụ Du Lịch Trực Tuyến

Nền tảng đặt dịch vụ du lịch trực tuyến (Fullstack Web Application) hỗ trợ tìm kiếm, đặt chỗ, thanh toán trực tuyến và quản lý vé điện tử cho đa dạng loại hình dịch vụ: **Chuyến bay (Flights)**, **Khách sạn (Hotels)**, **Tour du lịch (Tours)**, **Điểm tham quan (Attractions)** và **Xe khách / Tàu hỏa (Bus & Train)**.

---

## ✨ Tính Năng Chính

### Dành cho Khách hàng (User)
- **Tìm kiếm & Lọc nâng cao:** Tra cứu chuyến bay, khách sạn, tour, điểm tham quan và tuyến xe/tàu theo điểm đến, giá, thời gian, danh mục.
- **Đặt dịch vụ & Quản lý Booking:** Đặt chỗ trực tuyến, theo dõi lịch sử đặt vé, hủy vé và gửi lại vé điện tử (E-ticket) qua email.
- **Thanh toán trực tuyến:** Tích hợp cổng thanh toán **VNPay** và **PayPal**, tự động cập nhật trạng thái đơn hàng và gửi email xác nhận.
- **Xác thực & Bảo mật:** Đăng ký, đăng nhập bằng **JWT**, đăng nhập nhanh qua **OAuth2**, quên/đặt lại mật khẩu qua email.
- **Đa ngôn ngữ & Đánh giá:** Hỗ trợ chuyển đổi ngôn ngữ (`i18n`), quy đổi tỷ giá và đánh giá dịch vụ (Reviews).

### Dành cho Quản trị viên (Admin)
- **Quản lý danh mục & dịch vụ:** Thêm, sửa, xóa (CRUD) Tour, Khách sạn, Chuyến bay, Điểm tham quan, Tuyến xe/tàu và Nhà cung cấp.
- **Quản lý đơn đặt & Thanh toán:** Theo dõi toàn bộ booking, xem lịch sử giao dịch và xử lý hoàn tiền (Refund).
- **Quản lý người dùng:** Phân quyền (`CUSTOMER` / `ADMIN`) và quản trị tài khoản.

---

## 🚀 Công Nghệ Sử Dụng

| Thành phần | Công nghệ |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS v4, Axios, React Router, i18next |
| **Backend** | Java 17, Spring Boot 3, Spring Security (JWT & OAuth2), Maven |
| **Database** | MongoDB (Spring Data MongoDB) |
| **Payment Gateways** | VNPay, PayPal REST SDK |
| **API Docs & Testing** | Swagger / OpenAPI 3 (`springdoc-openapi`), Postman Collections |
| **Khác** | Bucket4j (Rate Limiting), JavaMailSender (Gửi E-ticket & thông báo) |

---

## 📂 Cấu Trúc Thư Mục

```text
IWS_Final/
├── backend/demo/             # Mã nguồn Backend (Spring Boot + MongoDB)
│   └── src/main/java/com/example/demo/
│       ├── config/           # Cấu hình Security, CORS, MongoDB, VNPay, PayPal, Swagger
│       ├── controller/       # REST API Controllers
│       ├── document/         # MongoDB Documents & Embedded models
│       ├── dto/              # Data Transfer Objects (Request/Response)
│       ├── exception/        # Xử lý ngoại lệ tập trung
│       ├── repository/       # Spring Data MongoDB Repositories
│       ├── security/         # JWT Filter, OAuth2 Handler, UserDetails
│       ├── service/          # Xử lý nghiệp vụ (Business Logic)
│       └── util/             # Tiện ích & RateLimitFilter
├── frontend/                 # Mã nguồn Frontend (React + Vite + Tailwind v4)
│   └── src/
│       ├── components/       # UI Components tái sử dụng
│       ├── context/          # Quản lý State toàn cục
│       ├── layouts/          # Layout cho User & Admin
│       ├── pages/            # Các trang chức năng (Flight, Hotel, Tour, Transport, Admin...)
│       ├── routes/           # Cấu hình định tuyến & phân quyền (PrivateRoute)
│       ├── services/         # Lớp gọi REST API (Axios)
│       ├── ui/               # Base UI primitives (Button, Card, Table, Pagination...)
│       └── utils/            # Hàm tiện ích
├── db-seeder/                # Script khởi tạo dữ liệu mẫu cho MongoDB
└── postman/                  # Bộ Postman Collections kiểm thử API
```

---

## 🛠️ Yêu Cầu Môi Trường

- **JDK 17** trở lên
- **Node.js v18** trở lên & `npm`
- **Maven** (hoặc sử dụng Maven Wrapper `./mvnw` có sẵn)
- **MongoDB** (Local hoặc MongoDB Atlas)

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Clone dự án
```bash
git clone https://github.com/nguyentrinhvo/IWS_Final.git
cd IWS_Final
```

### 2. Cấu hình & Chạy Backend (Spring Boot)
Di chuyển vào thư mục `backend/demo` và tạo file `.env` với các biến môi trường cần thiết (MongoDB URI, JWT Secret, Mail SMTP, VNPay, PayPal, OAuth2, Frontend URL):

```bash
cd backend/demo
```

Ví dụ cấu trúc biến môi trường trong `backend/demo/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/travel_booking
JWT_SECRET=your_jwt_secret_key
APP_FRONTEND_URL=http://localhost:5173
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173

# Payment (VNPay / PayPal)
VNPAY_TMN_CODE=your_tmn_code
VNPAY_HASH_SECRET=your_hash_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Mail (SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

> [!IMPORTANT]
> Không bao giờ commit file `.env` chứa thông tin nhạy cảm lên repository.

Khởi chạy Backend:
```bash
./mvnw spring-boot:run
```
- **API Base URL:** `http://localhost:8080`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`

### 3. Chạy Frontend (React + Vite)
Mở terminal mới tại thư mục gốc của dự án:
```bash
cd frontend
npm install
npm run dev
```
- **Frontend URL:** `http://localhost:5173` (Vite proxy tự động chuyển tiếp `/api` sang `http://localhost:8080/api`).

---

## 🧪 Kiểm Thử API

Dự án cung cấp sẵn bộ **Postman Collections** trong thư mục [`postman/`](./postman) bao gồm các nhóm API:
- Flights, Hotels, Attractions, Bus & Train
- My Tickets & Dashboard
- Payment (VNPay & PayPal)

---

## 🔀 Quy Trình Đóng Góp (Git Workflow)

1. Cập nhật nhánh `main` mới nhất:
   ```bash
   git checkout main && git pull origin main
   ```
2. Tạo nhánh tính năng mới:
   ```bash
   git checkout -b feature/<ten-tinh-nang>
   ```
3. Commit thay đổi với thông điệp rõ ràng và đẩy lên remote:
   ```bash
   git add .
   git commit -m "feat: mô tả ngắn gọn thay đổi"
   git push origin feature/<ten-tinh-nang>
   ```
4. Tạo **Pull Request** vào nhánh `main` để review trước khi merge.
