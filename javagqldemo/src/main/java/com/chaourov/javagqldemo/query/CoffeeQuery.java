package com.chaourov.javagqldemo.query;

import com.chaourov.javagqldemo.model.Coffee;
import com.chaourov.javagqldemo.model.CoffeeType;
import com.chaourov.javagqldemo.proxy.CoffeeClient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@DgsComponent
public class CoffeeQuery {
    private final CoffeeClient coffeeClient;

    public CoffeeQuery(CoffeeClient coffeeClient) {
        this.coffeeClient = coffeeClient;
    }

    @DgsQuery
    public List<Coffee> coffee(CoffeeType type) throws Exception {
        return coffeeClient.getCoffee(type);
    }
}
