# Dự Án Hệ Thống Internet & Web Service (IWS)

Đây là dự án mẫu sử dụng mô hình Fullstack với React và Spring Boot, được thiết kế cho làm việc nhóm (4 thành viên).

## 🚀 Công Nghệ Sử Dụng
- **Frontend**: React (Vite) + **Tailwind CSS v4** (Engine mới nhất)
- **Backend**: **Spring Boot 3.2** (Java 17, Maven)
- **Database**: [Điền tên DB bạn dùng, ví dụ: MySQL/PostgreSQL]

---

## 👥 Thành Viên Nhóm
1. [Họ tên SV 1] 
2. [Họ tên SV 2]
3. [Họ tên SV 3]
4. [Họ tên SV 4]

---

## 🛠 Hướng Dẫn Cho Thành Viên Mới

### 1. Lấy code về máy lần đầu
Mở terminal và chạy lệnh:
```bash
git clone https://github.com/nguyentrinhvo/IWS_Final.git
cd IWS_Final
```

### 2. Cài đặt môi trường
- **Cài đặt Node.js** (Phiên bản v18 trở lên).
- **Cài đặt JDK 17** (Bắt buộc để chạy Backend).
- **Cài đặt Maven** (Nếu dùng dòng lệnh).

### 3. Quy trình làm việc (Bắt buộc)
Để tránh xung đột code, tất cả thành viên **KHÔNG** push trực tiếp vào nhánh `main`.

**Bước 1: Cập nhật code mới nhất từ nhóm**
```bash
git checkout main
git pull origin main
```

**Bước 2: Tạo nhánh mới để làm tính năng của mình**
```bash
git checkout -b feature/ten-cua-ban_tinh-nang
# Ví dụ: git checkout -b feature/bao_login-page
```

**Bước 3: Code và Lưu lại**
```bash
git add .
git commit -m "Mô tả ngắn gọn việc bạn đã làm"
git push origin feature/ten-cua-ban_tinh-nang
```

**Bước 4: Tạo Pull Request**
- Lên GitHub, nhấn **Compare & pull request**.
- Tag các thành viên khác để review. Sau khi được duyệt mới gộp vào `main`.

---

## 💻 Cách Chạy Ứng Dụng

### 🟢 Chạy Backend (Spring Boot)
1. Di chuyển vào thư mục backend: `cd backend`
2. Chạy lệnh: `mvn spring-boot:run`
*Mặc định chạy tại: http://localhost:8080*

### 🔵 Chạy Frontend (React + Tailwind v4)
1. Di chuyển vào thư mục frontend: `cd frontend`
2. Cài đặt thư viện: `npm install`
3. Chạy lệnh: `npm run dev`
*Mặc định chạy tại: http://localhost:5173*

---

## 📂 Cấu Trúc Thư Mục
- `/backend`: Toàn bộ mã nguồn Java Spring Boot.
  - `src/main/java/com/example/demo/`
    - `config/`: Các file cấu hình (Security, CORS, Bean).
    - `controller/`: Nơi tiếp nhận các Request từ Frontend (API endpoints).
    - `service/`: Nơi xử lý Logic nghiệp vụ (Business Logic).
    - `repository/`: Nơi thực hiện các câu lệnh truy vấn Database (Data Access).
    - `entity/`: Các Object đại diện cho bảng trong Database.
    - `dto/`: Các Object dùng để truyền tải dữ liệu giữa các lớp.
    - `exception/`: Xử lý các lỗi ngoại lệ của ứng dụng.
- `/frontend`: Toàn bộ mã nguồn React và cấu hình Tailwind v4.
  - `src/`
    - `assets/`: Hình ảnh, icons, fonts...
    - `components/`: Các component dùng chung (Button, Card, Input...).
    - `pages/`: Các trang chính của ứng dụng (Home, Login, Dashboard...).
    - `layouts/`: Các khung giao diện (Navbar, Sidebar wrappers).
    - `services/`: Xử lý gọi API (Axios, Fetch).
    - `hooks/`: Các Custom Hooks tự định nghĩa.
    - `context/`: Quản lý State toàn cục (Context API).
    - `utils/`: Các hàm tiện ích bổ trợ.
- `.gitignore`: Đã được cấu hình để bỏ qua `node_modules` và `target/`.

---

## ⚠️ Lưu ý về Tailwind v4
Dự án sử dụng **Tailwind v4**, bạn không cần tìm file `tailwind.config.js`. Mọi cấu hình (variables, theme) sẽ được thực hiện trực tiếp trong file `frontend/src/index.css` bằng CSS thuần.
