package com.example.demo.service;

import com.example.demo.config.VNPayConfig;
import com.example.demo.document.BookingDocument;
import com.example.demo.document.UserDocument;
import com.example.demo.document.embed.PaymentEmbed;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.UserRepository;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {

    @Value("${vnpay.tmn-code}")
    private String vnp_TmnCode;

    @Value("${vnpay.hash-secret}")
    private String secretKey;

    @Value("${vnpay.pay-url}")
    private String vnp_PayUrl;

    @Value("${vnpay.return-url}")
    private String vnp_ReturnUrl;

    @Value("${vnpay.version}")
    private String vnp_Version;

    @Value("${vnpay.command}")
    private String vnp_Command;

    @Autowired
    private APIContext apiContext;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private JavaMailSender mailSender;

    // ──────────────────────────── VNPAY ────────────────────────────

    /**
     * Tạo URL thanh toán VNPay cho một booking.
     * Amount phải là VND (nhân 100 để có đơn vị của VNPay).
     */
    public String createVnPayPayment(String bookingId, HttpServletRequest request) {
        BookingDocument booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!"pending".equals(booking.getStatus())) {
            throw new RuntimeException("Booking is not in pending state");
        }

        long amount = (long) (booking.getTotalPrice() * 100); // VNPay requires amount * 100

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", bookingId);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang " + bookingId);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", VNPayConfig.getIpAddress(request));

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        vnp_Params.put("vnp_CreateDate", formatter.format(cld.getTime()));
        cld.add(Calendar.MINUTE, 15);
        vnp_Params.put("vnp_ExpireDate", formatter.format(cld.getTime()));

        // Sort params and build hash + query string
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                hashData.append(fieldName).append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII)).append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    hashData.append('&');
                    query.append('&');
                }
            }
        }
        String secureHash = VNPayConfig.hmacSHA512(secretKey, hashData.toString());
        return vnp_PayUrl + "?" + query + "&vnp_SecureHash=" + secureHash;
    }

    /**
     * Xác minh chữ ký IPN/Return từ VNPay và xử lý kết quả.
     * Trả về true nếu chữ ký hợp lệ và giao dịch thành công.
     */
    public boolean processVnPayReturn(Map<String, String> params) {
        String vnpSecureHash = params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");

        String signValue = VNPayConfig.hmacSHA512(secretKey, hashAllFields(params));
        if (!signValue.equals(vnpSecureHash)) {
            return false;
        }

        String responseCode = params.get("vnp_ResponseCode");
        if ("00".equals(responseCode)) {
            String bookingId = params.get("vnp_TxnRef");
            String transactionId = params.get("vnp_TransactionNo");
            markPaymentSuccess(bookingId, "vnpay", transactionId);
            return true;
        }
        return false;
    }

    // ──────────────────────────── PAYPAL ────────────────────────────

    /**
     * Tạo PayPal payment và trả về approval URL.
     * Tỷ giá demo: 1 USD = 25,000 VND.
     */
    public Payment createPayPalPayment(String bookingId, String cancelUrl, String successUrl)
            throws PayPalRESTException {
        BookingDocument booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!"pending".equals(booking.getStatus())) {
            throw new RuntimeException("Booking is not in pending state");
        }

        double totalUsd = booking.getTotalPrice() / 25000.0;

        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(String.format(Locale.US, "%.2f", totalUsd));

        Transaction transaction = new Transaction();
        transaction.setDescription("Payment for booking: " + bookingId);
        transaction.setAmount(amount);
        transaction.setCustom(bookingId); // pass bookingId through

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(Collections.singletonList(transaction));
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    /**
     * Thực hiện PayPal payment sau khi user approve.
     */
    public Payment executePayPalPayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution execution = new PaymentExecution();
        execution.setPayerId(payerId);
        return payment.execute(apiContext, execution);
    }

    // ──────────────────────────── COMMON ────────────────────────────

    /**
     * Cập nhật trạng thái booking thành confirmed + gửi email xác nhận.
     */
    public void markPaymentSuccess(String bookingId, String provider, String transactionId) {
        BookingDocument booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null) return;

        // Update payment embed
        PaymentEmbed payment = booking.getPayment();
        if (payment == null) payment = new PaymentEmbed();
        payment.setPaymentStatus("success");
        payment.setTransactionId(transactionId);
        payment.setPaidAt(new Date());
        booking.setPayment(payment);
        booking.setStatus("confirmed");
        bookingRepository.save(booking);

        // Send confirmation email
        sendPaymentConfirmationEmail(booking, provider, transactionId);
    }

    /**
     * Xử lý hoàn tiền thủ công (admin) — chỉ đánh dấu trạng thái refunded trong DB.
     * Với VNPay/PayPal sandbox, refund API thực tế cần thêm cấu hình gateway.
     */
    public boolean processRefund(String bookingId) {
        BookingDocument booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null) return false;

        if (!"cancelled".equals(booking.getStatus())) return false;

        PaymentEmbed payment = booking.getPayment();
        if (payment == null || !"success".equals(payment.getPaymentStatus())) return false;

        payment.setPaymentStatus("refunded");
        booking.setPayment(payment);
        bookingRepository.save(booking);

        // Notify user
        sendRefundConfirmationEmail(booking);
        return true;
    }

    // ──────────────────────────── EMAIL ────────────────────────────

    private void sendPaymentConfirmationEmail(BookingDocument booking, String provider, String transactionId) {
        try {
            UserDocument user = userRepository.findById(booking.getUserId()).orElse(null);
            if (user == null) return;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("✅ Xác nhận thanh toán thành công - " + booking.getSnapshotName());
            message.setText(
                "Xin chào " + user.getFullName() + ",\n\n" +
                "Thanh toán của bạn đã được xác nhận thành công.\n\n" +
                "📋 Chi tiết đơn hàng:\n" +
                "  - Dịch vụ:       " + booking.getSnapshotName() + "\n" +
                "  - Mã đặt chỗ:    " + booking.getId() + "\n" +
                "  - Tổng tiền:     " + String.format("%,.0f VND", booking.getTotalPrice()) + "\n" +
                "  - Phương thức:   " + provider.toUpperCase() + "\n" +
                "  - Mã giao dịch:  " + (transactionId != null ? transactionId : "N/A") + "\n" +
                "  - Thời gian:     " + new Date() + "\n\n" +
                "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!\n\n" +
                "Trân trọng,\nTravel Booking Team"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send payment confirmation email: " + e.getMessage());
        }
    }

    private void sendRefundConfirmationEmail(BookingDocument booking) {
        try {
            UserDocument user = userRepository.findById(booking.getUserId()).orElse(null);
            if (user == null) return;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("💰 Xác nhận hoàn tiền - " + booking.getSnapshotName());
            message.setText(
                "Xin chào " + user.getFullName() + ",\n\n" +
                "Yêu cầu hoàn tiền của bạn đã được xử lý.\n\n" +
                "📋 Chi tiết hoàn tiền:\n" +
                "  - Dịch vụ:    " + booking.getSnapshotName() + "\n" +
                "  - Mã đặt chỗ: " + booking.getId() + "\n" +
                "  - Số tiền:    " + String.format("%,.0f VND", booking.getTotalPrice()) + "\n\n" +
                "Tiền sẽ được hoàn về tài khoản của bạn trong vòng 3-5 ngày làm việc.\n\n" +
                "Trân trọng,\nTravel Booking Team"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send refund confirmation email: " + e.getMessage());
        }
    }

    // ──────────────────────────── ADMIN ────────────────────────────

    /**
     * Lấy lịch sử giao dịch (admin): tất cả booking có payment.
     */
    public List<BookingDocument> getAllPaymentHistory() {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getPayment() != null && b.getPayment().getPaymentStatus() != null)
                .sorted(Comparator.comparing(BookingDocument::getCreatedAt,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    // ──────────────────────────── UTIL ────────────────────────────

    private String hashAllFields(Map<String, String> fields) {
        List<String> fieldNames = new ArrayList<>(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder sb = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = fields.get(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                sb.append(fieldName).append("=")
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) sb.append("&");
            }
        }
        return sb.toString();
    }
}
