# 🗄️ Database Documentation: `Travel_Booking`

> **Note**: Tóm tắt thiết kế Database dành cho Backend Core (BE1) và Backend Services (BE2).

## 1. Design Strategies
1. **Embedding (Nhúng)**: Dùng cho dữ liệu luôn đi liền với cha và có số lượng nhỏ/cố định (<100 items). Ví dụ: `images`, `schedules`, `roomTypes`.
2. **Referencing (Tham chiếu)**: Dùng cho các entity độc lập, có thể scale lớn (Ví dụ: `tours` trỏ tới `categories.id`, `bookings` trỏ tới `users.id`).
3. **Snapshot Pattern**: Lưu cứng dữ liệu tại thời điểm phát sinh giao dịch. Trong `bookings`, các trường như `snapshotName` và `snapshotPrice` được copy sang ngay lập tức để tránh việc Admin sửa giá sau này làm sai lệch lịch sử giao dịch.

---

## 2. Các Collections & Trách nhiệm

### 🟢 Nhóm Base & Core (Do BE1 Đảm nhận)

#### `users`
*   **Mục đích**: Lưu thông tin khách hàng, admin.
*   **Lưu ý**: `email` phải là unique. JWT Auth Token sẽ hash từ collection này.

#### `categories`
*   **Mục đích**: Danh mục song ngữ cho Tour.

#### `tours`
*   **Mục đích**: Cung cấp thông tin sản phẩm Tour.
*   **Embeds**: Sẽ nhúng mảng `TourImage`, `Itinerary` (Lịch trình) và `Departure` (Các ngày khởi hành dự kiến).

#### `bookings` (Collection dùng chung)
*   **Mục đích**: Toàn bộ booking tour, vé máy bay, khách sạn... đều được lưu ở đây. Phân biệt nhờ trường `serviceType`.
*   **Quy tắc chung**: Khi tạo vé/booking mới ở tất cả các dịch vụ, CHẮC CHẮN phải chốt giá vào `snapshotPrice`.
*   **Embeds**: `payment` (Lưu log thanh toán VNPay/PayPal).

#### `reviews`
*   **Mục đích**: Lưu trữ đánh giá cho bất kỳ một `serviceId` nào.
*   **Cảnh báo**: Phải gắn `bookingId` —> Đảm bảo chỉ user đã đi/dùng dịch vụ mới được review.

#### `chatSessions`
*   **Embeds**: `messages` (Lưu lịch sử chát với Admin hoặc AI).

---

### 🔵 Nhóm Services & Features (Do BE2 Đảm nhận)

#### `flights`
*   **Mục đích**: Thông tin vé máy bay. 
*   **Lưu ý**: Lịch trình bay hàng ngày được nhúng vào bên trong qua `FlightSchedule`.

#### `hotels`
*   **Mục đích**: Danh sách khách sạn.
*   **Embeds**: `RoomType` (Các loại phòng của ks đó). Khi User book khách sạn, `RoomType.availableRooms` sẽ tự động trừ đi số phòng tương ứng.

#### `busTrainRoutes`
*   **Embeds**: `seatMap` chứa toàn bộ 1 sơ đồ ghế (Ví dụ: A1, B3) với status "available" hay "booked". Khi thanh toán xong đổi status qua booked.

#### `attractions`
*   **Mục đích**: Khu giải trí, vé thăm quan.
*   **Embeds**: `ticketTypes` và `openingHours`.

---

## 3. Các Indexes Cần Thiết
Để tăng tốc hệ thống, MongoDB đã thiết lập Index trên Document level (`@Indexed` hoặc `@CompoundIndex`):

*   **Compound (Phức hợp)**:
    *   `flights`: Gộp `departureAirport` và `arrivalAirport` cho việc search vé 2 chiều.
    *   `hotels`: Gộp `city` và `starRating`.
    *   `bookings`: Bộ lọc `serviceType` + `status`.
    *   `reviews`: Lọc theo `serviceId` + `serviceType`.
*   **Single (Đơn)**: 
    *   Email (`unique = true`).
    *   Keyword tìm kiếm (`String`).
    *   ID ngoại (`categoryId`, `userId`, `serviceId`).

---

## 4. Work Flow Phối Hợp Giữa 2 Backend Dev
1. Cả 2 dev làm việc với Database Name: `Travel_Booking`.
2. **BE1** commit file base `BookingDocument.java` trước.
3. **BE2** lấy code đó về, dùng `BookingRepository` cung cấp sẵn để tạo Booking cho các module: Máy bay, Khách sạn, Tàu xe. 
4. Cả 2 bên đều tận dụng `BaseResponseDTO` hoặc `Pageable` để chuẩn hoá cấu trúc trả về Client.
