package com.example.demo.service;

import com.example.demo.document.AttractionDocument;
import com.example.demo.document.BookingDocument;
import com.example.demo.document.embed.PaymentEmbed;
import com.example.demo.document.embed.TicketType;
import com.example.demo.dto.attraction.AttractionDTO;
import com.example.demo.dto.attraction.AttractionRequest;
import com.example.demo.dto.attraction.TicketPurchaseRequest;
import com.example.demo.dto.booking.BookingDTO;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.AttractionRepository;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttractionService {

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingService bookingService;

    // ──────────────────────────── PUBLIC ────────────────────────────

    /**
     * Danh sách tất cả điểm tham quan đang hoạt động (phân trang).
     */
    public Page<AttractionDTO> getAllActive(Pageable pageable) {
        return attractionRepository.findByIsActiveTrue(pageable).map(this::mapToDTO);
    }

    /**
     * Lọc theo loại hình: entertainment / nature / culture.
     */
    public Page<AttractionDTO> filterByType(String attractionType, Pageable pageable) {
        return attractionRepository
                .findByAttractionTypeAndIsActiveTrue(attractionType, pageable)
                .map(this::mapToDTO);
    }

    /**
     * Lọc theo khu vực (location).
     */
    public Page<AttractionDTO> filterByLocation(String location, Pageable pageable) {
        return attractionRepository
                .findByLocationAndIsActiveTrue(location, pageable)
                .map(this::mapToDTO);
    }

    /**
     * Lọc theo khoảng giá vé.
     */
    public Page<AttractionDTO> filterByPriceRange(Double minPrice, Double maxPrice, Pageable pageable) {
        return attractionRepository.findByPriceRange(minPrice, maxPrice, pageable).map(this::mapToDTO);
    }

    /**
     * Kết hợp lọc: loại, khu vực, khoảng giá.
     */
    public Page<AttractionDTO> search(String location, String attractionType,
                                       Double minPrice, Double maxPrice, Pageable pageable) {
        if (minPrice != null && maxPrice != null) {
            return attractionRepository.findByPriceRange(minPrice, maxPrice, pageable).map(this::mapToDTO);
        }
        if (attractionType != null && !attractionType.isBlank() && location != null && !location.isBlank()) {
            return attractionRepository
                    .findByAttractionTypeAndIsActiveTrue(attractionType, pageable)
                    .map(this::mapToDTO);
        }
        if (attractionType != null && !attractionType.isBlank()) {
            return filterByType(attractionType, pageable);
        }
        if (location != null && !location.isBlank()) {
            return filterByLocation(location, pageable);
        }
        return getAllActive(pageable);
    }

    /**
     * Xem chi tiết điểm tham quan (kể cả admin — không filter isActive).
     */
    public AttractionDTO getById(String id) {
        AttractionDocument doc = attractionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attraction not found"));
        return mapToDTO(doc);
    }

    // ──────────────────────────── BOOKING / TICKET ────────────────────────────

    /**
     * Mua vé tham quan — tạo BookingDocument với serviceType="attraction".
     * Tích hợp thanh toán VNPay/PayPal qua PaymentController sau bước này.
     */
    public BookingDTO purchaseTicket(String userId, TicketPurchaseRequest request) {
        AttractionDocument attraction = attractionRepository.findById(request.getAttractionId())
                .orElseThrow(() -> new ResourceNotFoundException("Attraction not found"));

        if (attraction.getIsActive() == null || !attraction.getIsActive()) {
            throw new ResourceNotFoundException("Attraction is not active");
        }

        // Tìm loại vé được chọn
        TicketType selectedTicket = null;
        if (attraction.getTicketTypes() != null) {
            selectedTicket = attraction.getTicketTypes().stream()
                    .filter(t -> t.getTypeName().equals(request.getTicketTypeName())
                              && Boolean.TRUE.equals(t.getIsAvailable()))
                    .findFirst()
                    .orElse(null);
        }

        if (selectedTicket == null) {
            throw new ResourceNotFoundException("Ticket type '" + request.getTicketTypeName() + "' not found or unavailable");
        }

        // Kiểm tra số lượng còn lại (null = không giới hạn)
        int qty = request.getQuantity();
        if (selectedTicket.getAvailableQuantity() != null) {
            if (selectedTicket.getAvailableQuantity() < qty) {
                throw new BadRequestException("Not enough tickets available. Remaining: "
                        + selectedTicket.getAvailableQuantity());
            }
            // Trừ số vé
            selectedTicket.setAvailableQuantity(selectedTicket.getAvailableQuantity() - qty);
            attractionRepository.save(attraction);
        }

        double totalPrice = selectedTicket.getPrice() * qty;

        Map<String, Object> snapshotDetail = new HashMap<>();
        snapshotDetail.put("attractionId", attraction.getId());
        snapshotDetail.put("attractionType", attraction.getAttractionType());
        snapshotDetail.put("location", attraction.getLocation());
        snapshotDetail.put("ticketTypeName", selectedTicket.getTypeName());
        snapshotDetail.put("pricePerTicket", selectedTicket.getPrice());
        snapshotDetail.put("quantity", qty);
        if (attraction.getOpeningHours() != null) {
            snapshotDetail.put("openAt", attraction.getOpeningHours().getOpenAt());
            snapshotDetail.put("closeAt", attraction.getOpeningHours().getCloseAt());
        }

        PaymentEmbed payment = PaymentEmbed.builder()
                .provider(request.getPaymentProvider())
                .paymentStatus("pending")
                .build();

        BookingDocument booking = BookingDocument.builder()
                .userId(userId)
                .serviceId(request.getAttractionId())
                .serviceType("attraction")
                .quantity(qty)
                .totalPrice(totalPrice)
                .status("pending")
                .note(request.getNote())
                .snapshotName(attraction.getNameVi() + " - " + selectedTicket.getTypeName())
                .snapshotPrice(selectedTicket.getPrice())
                .snapshotDetail(snapshotDetail)
                .payment(payment)
                .createdAt(new Date())
                .build();

        BookingDocument saved = bookingRepository.save(booking);
        return mapBookingToDTO(saved);
    }

    /**
     * Huỷ vé tham quan — hoàn lại số lượng vé nếu còn trong inventory.
     */
    public BookingDTO cancelTicket(String bookingId, String userId) {
        BookingDocument booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getUserId().equals(userId)) {
            throw new BadRequestException("Cannot cancel another user's booking");
        }
        if (!"attraction".equals(booking.getServiceType())) {
            throw new BadRequestException("This is not an attraction booking");
        }
        if ("cancelled".equals(booking.getStatus())) {
            throw new BadRequestException("Booking is already cancelled");
        }

        booking.setStatus("cancelled");
        bookingRepository.save(booking);

        // Hoàn lại số vé vào inventory
        if (booking.getServiceId() != null && booking.getSnapshotDetail() != null) {
            String ticketTypeName = (String) booking.getSnapshotDetail().get("ticketTypeName");
            int qty = booking.getQuantity() != null ? booking.getQuantity() : 1;

            attractionRepository.findById(booking.getServiceId()).ifPresent(attraction -> {
                if (attraction.getTicketTypes() != null && ticketTypeName != null) {
                    attraction.getTicketTypes().stream()
                            .filter(t -> t.getTypeName().equals(ticketTypeName))
                            .findFirst()
                            .ifPresent(t -> {
                                if (t.getAvailableQuantity() != null) {
                                    t.setAvailableQuantity(t.getAvailableQuantity() + qty);
                                }
                            });
                    attractionRepository.save(attraction);
                }
            });
        }

        return mapBookingToDTO(booking);
    }

    // ──────────────────────────── ADMIN ────────────────────────────

    /**
     * Admin: Lấy tất cả điểm tham quan (kể cả inactive).
     */
    public Page<AttractionDTO> getAll(Pageable pageable) {
        return attractionRepository.findAll(pageable).map(this::mapToDTO);
    }

    /**
     * Admin: Tạo điểm tham quan mới.
     */
    public AttractionDTO create(AttractionRequest request) {
        AttractionDocument doc = AttractionDocument.builder()
                .nameVi(request.getNameVi())
                .nameEn(request.getNameEn())
                .location(request.getLocation())
                .attractionType(request.getAttractionType())
                .descriptionVi(request.getDescriptionVi())
                .descriptionEn(request.getDescriptionEn())
                .thumbnailUrl(request.getThumbnailUrl())
                .images(request.getImages())
                .openingHours(request.getOpeningHours())
                .ticketTypes(request.getTicketTypes())
                .avgRating(0.0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();

        return mapToDTO(attractionRepository.save(doc));
    }

    /**
     * Admin: Cập nhật thông tin điểm tham quan (kể cả bảng giá vé và lịch hoạt động).
     */
    public AttractionDTO update(String id, AttractionRequest request) {
        AttractionDocument doc = attractionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attraction not found"));

        doc.setNameVi(request.getNameVi());
        doc.setNameEn(request.getNameEn());
        doc.setLocation(request.getLocation());
        doc.setAttractionType(request.getAttractionType());
        doc.setDescriptionVi(request.getDescriptionVi());
        doc.setDescriptionEn(request.getDescriptionEn());
        doc.setThumbnailUrl(request.getThumbnailUrl());
        doc.setImages(request.getImages());

        // Cập nhật giờ hoạt động
        if (request.getOpeningHours() != null) {
            doc.setOpeningHours(request.getOpeningHours());
        }
        // Cập nhật bảng giá vé
        if (request.getTicketTypes() != null) {
            doc.setTicketTypes(request.getTicketTypes());
        }
        if (request.getIsActive() != null) {
            doc.setIsActive(request.getIsActive());
        }

        return mapToDTO(attractionRepository.save(doc));
    }

    /**
     * Admin: Xoá mềm (set isActive = false).
     */
    public void delete(String id) {
        AttractionDocument doc = attractionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attraction not found"));
        doc.setIsActive(false);
        attractionRepository.save(doc);
    }

    // ──────────────────────────── MAPPING ────────────────────────────

    private AttractionDTO mapToDTO(AttractionDocument doc) {
        Double minPrice = null;
        if (doc.getTicketTypes() != null) {
            minPrice = doc.getTicketTypes().stream()
                    .filter(t -> Boolean.TRUE.equals(t.getIsAvailable()) && t.getPrice() != null)
                    .mapToDouble(TicketType::getPrice)
                    .min()
                    .stream()
                    .boxed()
                    .findFirst()
                    .orElse(null);
        }
        return AttractionDTO.builder()
                .id(doc.getId())
                .nameVi(doc.getNameVi())
                .nameEn(doc.getNameEn())
                .location(doc.getLocation())
                .attractionType(doc.getAttractionType())
                .descriptionVi(doc.getDescriptionVi())
                .descriptionEn(doc.getDescriptionEn())
                .thumbnailUrl(doc.getThumbnailUrl())
                .images(doc.getImages())
                .openingHours(doc.getOpeningHours())
                .ticketTypes(doc.getTicketTypes())
                .avgRating(doc.getAvgRating())
                .isActive(doc.getIsActive())
                .minPrice(minPrice)
                .build();
    }

    private BookingDTO mapBookingToDTO(BookingDocument booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUserId());
        dto.setServiceId(booking.getServiceId());
        dto.setServiceType(booking.getServiceType());
        dto.setQuantity(booking.getQuantity());
        dto.setTotalPrice(booking.getTotalPrice());
        dto.setStatus(booking.getStatus());
        dto.setNote(booking.getNote());
        dto.setSnapshotName(booking.getSnapshotName());
        dto.setSnapshotPrice(booking.getSnapshotPrice());
        dto.setSnapshotDetail(booking.getSnapshotDetail());
        dto.setPayment(booking.getPayment());
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }

    public com.example.demo.dto.attraction.AttractionStatsDTO getStats() {
        List<AttractionDocument> all = attractionRepository.findAll();
        long totalAttractions = all.size();
        long activeAttractions = all.stream().filter(a -> a.getIsActive() != null && a.getIsActive()).count();
        
        long totalTickets = all.stream()
                .filter(a -> a.getTicketTypes() != null)
                .mapToLong(a -> a.getTicketTypes().size())
                .sum();
                
        double avgPrice = all.stream()
                .filter(a -> a.getTicketTypes() != null)
                .flatMap(a -> a.getTicketTypes().stream())
                .mapToDouble(t -> t.getPrice() != null ? t.getPrice() : 0.0)
                .average()
                .orElse(0.0);

        return com.example.demo.dto.attraction.AttractionStatsDTO.builder()
                .totalAttractions(totalAttractions)
                .activeAttractions(activeAttractions)
                .totalTickets(totalTickets)
                .avgTicketPrice(avgPrice)
                .build();
    }
}
