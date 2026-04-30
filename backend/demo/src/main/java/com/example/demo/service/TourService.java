package com.example.demo.service;

import com.example.demo.document.TourDocument;
import com.example.demo.dto.auth.MessageResponse;
import com.example.demo.dto.tour.TourDTO;
import com.example.demo.dto.tour.TourRequest;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.TourRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Page<TourDTO> getTours(String categoryId, String tourType, String destination, String country, 
                                  Integer durationDays, Double maxPrice, String keyword, Pageable pageable) {
        
        Query query = new Query().with(pageable);
        List<Criteria> criteriaList = new ArrayList<>();
        
        criteriaList.add(Criteria.where("isDeleted").is(false));
        
        if (categoryId != null && !categoryId.trim().isEmpty()) {
            criteriaList.add(Criteria.where("categoryId").is(categoryId));
        }
        if (tourType != null && !tourType.trim().isEmpty()) {
            criteriaList.add(Criteria.where("tourType").is(tourType));
        }
        if (destination != null && !destination.trim().isEmpty()) {
            criteriaList.add(Criteria.where("destination").is(destination));
        }
        if (country != null && !country.trim().isEmpty()) {
            criteriaList.add(Criteria.where("country").is(country));
        }
        if (durationDays != null) {
            criteriaList.add(Criteria.where("durationDays").is(durationDays));
        }
        if (maxPrice != null) {
            criteriaList.add(Criteria.where("priceAdult").lte(maxPrice));
        }
        if (keyword != null && !keyword.trim().isEmpty()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                Criteria.where("nameVi").regex(keyword, "i"),
                Criteria.where("nameEn").regex(keyword, "i")
            );
            criteriaList.add(keywordCriteria);
        }
        
        query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        
        long total = mongoTemplate.count(query, TourDocument.class);
        List<TourDocument> tours = mongoTemplate.find(query, TourDocument.class);
        
        List<TourDTO> tourDTOs = tours.stream().map(this::mapToDTO).collect(Collectors.toList());
        
        return new PageImpl<>(tourDTOs, pageable, total);
    }

    public TourDTO getTourById(String id) {
        TourDocument tour = tourRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found"));
        if (tour.getIsDeleted() != null && tour.getIsDeleted()) {
            throw new ResourceNotFoundException("Tour not found");
        }
        return mapToDTO(tour);
    }

    public TourDTO createTour(TourRequest request) {
        TourDocument tour = new TourDocument();
        mapRequestToDocument(request, tour);
        tour.setIsDeleted(false);
        tour.setCreatedAt(new Date());
        tour.setUpdatedAt(new Date());
        tour.setAvgRating(0.0);
        tour.setTotalReviews(0);
        
        TourDocument savedTour = tourRepository.save(tour);
        return mapToDTO(savedTour);
    }

    public TourDTO updateTour(String id, TourRequest request) {
        TourDocument tour = tourRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found"));
                
        if (tour.getIsDeleted() != null && tour.getIsDeleted()) {
            throw new ResourceNotFoundException("Tour not found");
        }
                
        mapRequestToDocument(request, tour);
        tour.setUpdatedAt(new Date());
        
        TourDocument updatedTour = tourRepository.save(tour);
        return mapToDTO(updatedTour);
    }

    public MessageResponse deleteTour(String id) {
        TourDocument tour = tourRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found"));
                
        tour.setIsDeleted(true);
        tour.setUpdatedAt(new Date());
        tourRepository.save(tour);
        
        return new MessageResponse("Tour deleted successfully");
    }
    
    private void mapRequestToDocument(TourRequest request, TourDocument tour) {
        if (request.getCategoryId() != null) tour.setCategoryId(request.getCategoryId());
        if (request.getNameVi() != null) tour.setNameVi(request.getNameVi());
        if (request.getNameEn() != null) tour.setNameEn(request.getNameEn());
        if (request.getDescriptionVi() != null) tour.setDescriptionVi(request.getDescriptionVi());
        if (request.getDescriptionEn() != null) tour.setDescriptionEn(request.getDescriptionEn());
        if (request.getTourType() != null) tour.setTourType(request.getTourType());
        if (request.getPriceAdult() != null) tour.setPriceAdult(request.getPriceAdult());
        if (request.getPriceChild() != null) tour.setPriceChild(request.getPriceChild());
        if (request.getDurationDays() != null) tour.setDurationDays(request.getDurationDays());
        if (request.getDepartureCity() != null) tour.setDepartureCity(request.getDepartureCity());
        if (request.getDestination() != null) tour.setDestination(request.getDestination());
        if (request.getCountry() != null) tour.setCountry(request.getCountry());
        if (request.getRequireVisa() != null) tour.setRequireVisa(request.getRequireVisa());
        if (request.getVisaInfo() != null) tour.setVisaInfo(request.getVisaInfo());
        if (request.getMaxCapacity() != null) tour.setMaxCapacity(request.getMaxCapacity());
        if (request.getImages() != null) tour.setImages(request.getImages());
        if (request.getItinerary() != null) tour.setItinerary(request.getItinerary());
        if (request.getDepartures() != null) tour.setDepartures(request.getDepartures());
    }
    
    private TourDTO mapToDTO(TourDocument tour) {
        TourDTO dto = new TourDTO();
        dto.setId(tour.getId());
        dto.setCategoryId(tour.getCategoryId());
        dto.setNameVi(tour.getNameVi());
        dto.setNameEn(tour.getNameEn());
        dto.setDescriptionVi(tour.getDescriptionVi());
        dto.setDescriptionEn(tour.getDescriptionEn());
        dto.setTourType(tour.getTourType());
        dto.setPriceAdult(tour.getPriceAdult());
        dto.setPriceChild(tour.getPriceChild());
        dto.setDurationDays(tour.getDurationDays());
        dto.setDepartureCity(tour.getDepartureCity());
        dto.setDestination(tour.getDestination());
        dto.setCountry(tour.getCountry());
        dto.setRequireVisa(tour.getRequireVisa());
        dto.setVisaInfo(tour.getVisaInfo());
        dto.setMaxCapacity(tour.getMaxCapacity());
        dto.setAvgRating(tour.getAvgRating());
        dto.setTotalReviews(tour.getTotalReviews());
        dto.setImages(tour.getImages());
        dto.setItinerary(tour.getItinerary());
        dto.setDepartures(tour.getDepartures());
        dto.setCreatedAt(tour.getCreatedAt());
        dto.setUpdatedAt(tour.getUpdatedAt());
        return dto;
    }
}
