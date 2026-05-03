package com.example.demo.controller;

import com.example.demo.dto.attraction.AttractionDTO;
import com.example.demo.dto.attraction.AttractionRequest;
import com.example.demo.dto.attraction.TicketPurchaseRequest;
import com.example.demo.dto.booking.BookingDTO;
import com.example.demo.security.UserDetailsImpl;
import com.example.demo.service.AttractionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attractions")
public class AttractionController {

    @Autowired
    private AttractionService attractionService;

    // ──────────────────────────── PUBLIC ────────────────────────────

    /**
     * GET /api/attractions
     * Danh sách điểm tham quan, hỗ trợ lọc và phân trang.
     *
     * Params: location, attractionType, minPrice, maxPrice, page, size, sort
     */
    @GetMapping
    public ResponseEntity<Page<AttractionDTO>> search(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String attractionType,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "nameVi,asc") String[] sort) {

        Sort.Direction dir = sort.length > 1 && "asc".equalsIgnoreCase(sort[1])
                ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sort[0]));

        return ResponseEntity.ok(attractionService.search(location, attractionType, minPrice, maxPrice, pageable));
    }

    /**
     * GET /api/attractions/{id}
     * Chi tiết một điểm tham quan.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AttractionDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(attractionService.getById(id));
    }

    // ──────────────────────────── CUSTOMER ────────────────────────────

    /**
     * POST /api/attractions/tickets/purchase
     * Mua vé tham quan. Trả về BookingDTO ở trạng thái "pending".
     * Sau đó dùng bookingId để gọi /api/payment/vnpay/create hoặc /api/payment/paypal/create.
     */
    @PostMapping("/tickets/purchase")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> purchaseTicket(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody TicketPurchaseRequest request) {
        BookingDTO booking = attractionService.purchaseTicket(userDetails.getId(), request);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    /**
     * PUT /api/attractions/tickets/{bookingId}/cancel
     * Huỷ vé tham quan (hoàn lại số lượng vé).
     */
    @PutMapping("/tickets/{bookingId}/cancel")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<BookingDTO> cancelTicket(
            @PathVariable String bookingId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        BookingDTO booking = attractionService.cancelTicket(bookingId, userDetails.getId());
        return ResponseEntity.ok(booking);
    }

    // ──────────────────────────── ADMIN ────────────────────────────

    /**
     * GET /api/attractions/admin/all
     * Lấy tất cả điểm tham quan (kể cả inactive).
     */
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<AttractionDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "nameVi,asc") String[] sort) {

        Sort.Direction dir = sort.length > 1 && "asc".equalsIgnoreCase(sort[1])
                ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sort[0]));
        return ResponseEntity.ok(attractionService.getAll(pageable));
    }

    /**
     * POST /api/attractions
     * Admin: Tạo điểm tham quan mới.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AttractionDTO> create(@Valid @RequestBody AttractionRequest request) {
        return new ResponseEntity<>(attractionService.create(request), HttpStatus.CREATED);
    }

    /**
     * PUT /api/attractions/{id}
     * Admin: Cập nhật thông tin điểm tham quan (bao gồm bảng giá và lịch hoạt động).
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AttractionDTO> update(
            @PathVariable String id,
            @Valid @RequestBody AttractionRequest request) {
        return ResponseEntity.ok(attractionService.update(id, request));
    }

    /**
     * DELETE /api/attractions/{id}
     * Admin: Xoá mềm điểm tham quan (isActive = false).
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        attractionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
