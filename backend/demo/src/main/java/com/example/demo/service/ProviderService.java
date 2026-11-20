package com.example.demo.service;

import com.example.demo.document.ProviderDocument;
import com.example.demo.repository.ProviderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderService {
    private final ProviderRepository repository;

    public List<ProviderDocument> getAllProviders() {
        return repository.findAll();
    }

    public ProviderDocument createProvider(ProviderDocument provider) {
        return repository.save(provider);
    }

    public ProviderDocument updateProvider(String id, ProviderDocument provider) {
        provider.setId(id);
        return repository.save(provider);
    }

    public void deleteProvider(String id) {
        repository.deleteById(id);
    }
}
