package com.chaourov.javagqldemo.health;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthCheck {
    private final ObjectMapper mapper;

    public HealthCheck(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @GetMapping("/health")
    public String status() {
        try {
            var result = Map.of("status", "UP");
            return mapper.writeValueAsString(result);
        }
        catch (JsonProcessingException e) {
            throw new InternalError("Service down.");
        }
    }

}