package com.chaourov.javagqldemo.proxy;

import com.chaourov.javagqldemo.model.Coffee;
import com.chaourov.javagqldemo.model.CoffeeType;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Component
public class CoffeeClient {
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public CoffeeClient(HttpClient httpClient, ObjectMapper objectMapper) {
        this.httpClient = httpClient;
        this.objectMapper = objectMapper;
    }

    public List<Coffee> getCoffee(CoffeeType type) {
        var uri = coffeeURI(type);

        var request = HttpRequest.newBuilder()
                .uri(uri)
                .header("Content-Type", "application/json")
                .GET()
                .build();

        try {
            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString()).body();
            return objectMapper.readValue(response, new TypeReference<>() {});
        } catch (IOException | InterruptedException e) {
            throw new InternalError("Server failed to retrieve coffees", e);
        }
    }

    private URI coffeeURI(CoffeeType type) {
        return URI.create("https://api.sampleapis.com/coffee/" + type.toString());
    }
}
