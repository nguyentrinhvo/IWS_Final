package com.example.demo.controller;

import com.example.demo.config.VNPayConfig;
import com.example.demo.document.BookingDocument;
import com.example.demo.dto.payment.PaymentHistoryDTO;
import com.example.demo.service.PaymentService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Value("${vnpay.hash-secret}")
    private String vnp_HashSecret;

    // ──────────────────────────── VNPAY ────────────────────────────

    /**
     * POST /api/payment/vnpay/create/{bookingId}
     * Tạo URL thanh toán VNPay. Yêu cầu đăng nhập.
     */
    @PostMapping("/vnpay/create/{bookingId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<?> createVnPayPayment(
            @PathVariable String bookingId,
            HttpServletRequest request) {
        try {
            String paymentUrl = paymentService.createVnPayPayment(bookingId, request);
            Map<String, String> response = new HashMap<>();
            response.put("paymentUrl", paymentUrl);
            response.put("status", "success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * GET /api/payment/vnpay-return
     * Callback từ VNPay sau khi thanh toán. Không yêu cầu auth (VNPay redirect).
     */
    @GetMapping("/vnpay-return")
    public void vnPayReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<String, String> fields = new HashMap<>();
        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String name = params.nextElement();
            String value = request.getParameter(name);
            if (value != null && !value.isEmpty()) {
                fields.put(name, value);
            }
        }

        String bookingId = fields.get("vnp_TxnRef");
        boolean success = paymentService.processVnPayReturn(fields);

        if (success) {
            response.sendRedirect(frontendUrl + "/payment-result?status=success&bookingId=" + bookingId + "&gateway=vnpay");
        } else {
            String responseCode = request.getParameter("vnp_ResponseCode");
            response.sendRedirect(frontendUrl + "/payment-result?status=failed&code=" + responseCode + "&gateway=vnpay");
        }
    }

    // ──────────────────────────── PAYPAL ────────────────────────────

    /**
     * POST /api/payment/paypal/create/{bookingId}
     * Tạo PayPal payment và trả về approval URL.
     */
    @PostMapping("/paypal/create/{bookingId}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<?> createPayPalPayment(@PathVariable String bookingId) {
        try {
            String cancelUrl = "http://localhost:8080/api/payment/paypal/cancel";
            String successUrl = "http://localhost:8080/api/payment/paypal/success";
            Payment payment = paymentService.createPayPalPayment(bookingId, cancelUrl, successUrl);

            for (Links link : payment.getLinks()) {
                if ("approval_url".equals(link.getRel())) {
                    return ResponseEntity.ok(Map.of(
                            "paymentUrl", link.getHref(),
                            "paymentId", payment.getId(),
                            "status", "success"
                    ));
                }
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "No approval URL found"));
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * GET /api/payment/paypal/success
     * Callback từ PayPal sau khi user approve. Không yêu cầu auth.
     */
    @GetMapping("/paypal/success")
    public void paypalSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId,
            HttpServletResponse response) throws IOException {
        try {
            Payment payment = paymentService.executePayPalPayment(paymentId, payerId);
            if ("approved".equals(payment.getState())) {
                String bookingId = payment.getTransactions().get(0).getCustom();
                paymentService.markPaymentSuccess(bookingId, "paypal", paymentId);
                response.sendRedirect(frontendUrl + "/payment-result?status=success&bookingId=" + bookingId + "&gateway=paypal");
            } else {
                response.sendRedirect(frontendUrl + "/payment-result?status=failed&gateway=paypal");
            }
        } catch (PayPalRESTException e) {
            response.sendRedirect(frontendUrl + "/payment-result?status=error&gateway=paypal");
        }
    }

    /**
     * GET /api/payment/paypal/cancel
     * User huỷ thanh toán trên PayPal.
     */
    @GetMapping("/paypal/cancel")
    public void paypalCancel(HttpServletResponse response) throws IOException {
        response.sendRedirect(frontendUrl + "/payment-result?status=cancelled&gateway=paypal");
    }

    // ──────────────────────────── ADMIN ────────────────────────────

    /**
     * GET /api/admin/payment/history
     * Xem lịch sử giao dịch thanh toán (admin only).
     */
    @GetMapping("/admin/history")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPaymentHistory() {
        List<BookingDocument> history = paymentService.getAllPaymentHistory();
        List<PaymentHistoryDTO> result = history.stream()
                .map(PaymentHistoryDTO::from)
                .toList();
        return ResponseEntity.ok(result);
    }

    /**
     * POST /api/admin/payment/refund/{bookingId}
     * Xử lý yêu cầu hoàn tiền thủ công (admin only).
     * Booking phải ở trạng thái "cancelled" và đã thanh toán thành công.
     */
    @PostMapping("/admin/refund/{bookingId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> processRefund(@PathVariable String bookingId) {
        boolean success = paymentService.processRefund(bookingId);
        if (success) {
            return ResponseEntity.ok(Map.of(
                    "message", "Hoàn tiền thành công cho booking: " + bookingId,
                    "bookingId", bookingId
            ));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "message", "Không thể hoàn tiền. Kiểm tra lại trạng thái booking và thanh toán."
            ));
        }
    }
}
