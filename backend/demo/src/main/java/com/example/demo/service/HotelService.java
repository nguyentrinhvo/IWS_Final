package com.example.demo.service;

import com.example.demo.document.HotelDocument;
import com.example.demo.dto.hotel.HotelDTO;
import com.example.demo.dto.hotel.HotelRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.HotelRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public HotelDTO createHotel(HotelRequest request) {
        HotelDocument document = HotelDocument.builder()
                .name(request.getName())
                .address(request.getAddress())
                .city(request.getCity())
                .country(request.getCountry())
                .starRating(request.getStarRating())
                .description(request.getDescription())
                .thumbnailUrl(request.getThumbnailUrl())
                .images(request.getImages())
                .amenities(request.getAmenities())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .avgRating(request.getAvgRating())
                .roomTypes(request.getRoomTypes())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();

        HotelDocument saved = hotelRepository.save(document);
        return mapToDTO(saved);
    }

    public HotelDTO updateHotel(String id, HotelRequest request) {
        HotelDocument document = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));

        document.setName(request.getName());
        document.setAddress(request.getAddress());
        document.setCity(request.getCity());
        document.setCountry(request.getCountry());
        document.setStarRating(request.getStarRating());
        document.setDescription(request.getDescription());
        document.setThumbnailUrl(request.getThumbnailUrl());
        document.setImages(request.getImages());
        document.setAmenities(request.getAmenities());
        document.setLatitude(request.getLatitude());
        document.setLongitude(request.getLongitude());
        document.setAvgRating(request.getAvgRating());
        document.setRoomTypes(request.getRoomTypes());

        if (request.getIsActive() != null) {
            document.setIsActive(request.getIsActive());
        }

        HotelDocument updated = hotelRepository.save(document);
        return mapToDTO(updated);
    }

    public void deleteHotel(String id) {
        HotelDocument document = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        document.setIsActive(false);
        hotelRepository.save(document);
    }

    public HotelDTO getHotelById(String id) {
        HotelDocument document = hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));
        return mapToDTO(document);
    }

    public Page<HotelDTO> getAllHotels(Pageable pageable) {
        return hotelRepository.findAll(pageable).map(this::mapToDTO);
    }

    public Page<HotelDTO> searchHotels(String city, Double minPrice, Double maxPrice, Integer minStar, Pageable pageable) {
        if (minPrice != null && maxPrice != null) {
            return hotelRepository.findByPriceRange(city, minPrice, maxPrice, pageable).map(this::mapToDTO);
        } else if (minStar != null) {
            return hotelRepository.findByCityIgnoreCaseAndStarRatingGreaterThanEqualAndIsActiveTrue(city, minStar, pageable).map(this::mapToDTO);
        } else {
            // Flexible keyword search (matches city, address, or name)
            return hotelRepository.searchByKeyword(city, pageable).map(this::mapToDTO);
        }
    }

    private HotelDTO mapToDTO(HotelDocument document) {
        return HotelDTO.builder()
                .id(document.getId())
                .name(document.getName())
                .address(document.getAddress())
                .city(document.getCity())
                .country(document.getCountry())
                .starRating(document.getStarRating())
                .description(document.getDescription())
                .thumbnailUrl(document.getThumbnailUrl())
                .images(document.getImages())
                .amenities(document.getAmenities())
                .latitude(document.getLatitude())
                .longitude(document.getLongitude())
                .avgRating(document.getAvgRating())
                .roomTypes(document.getRoomTypes())
                .isActive(document.getIsActive())
                .build();
    }
}
