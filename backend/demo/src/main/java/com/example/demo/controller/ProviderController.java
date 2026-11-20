package com.example.demo.controller;

import com.example.demo.document.ProviderDocument;
import com.example.demo.service.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
@RequiredArgsConstructor
public class ProviderController {
    private final ProviderService service;

    @GetMapping
    public List<ProviderDocument> getAll() {
        return service.getAllProviders();
    }

    @PostMapping
    public ProviderDocument create(@RequestBody ProviderDocument provider) {
        return service.createProvider(provider);
    }

    @PutMapping("/{id}")
    public ProviderDocument update(@PathVariable String id, @RequestBody ProviderDocument provider) {
        return service.updateProvider(id, provider);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        service.deleteProvider(id);
        return ResponseEntity.ok().build();
    }
}
