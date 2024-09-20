package com.chaourov.javagqldemo.configuration;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.http.HttpClient;
import java.time.Duration;

@Configuration
public class ClientConfig {
    @Bean
    public HttpClient httpClient() {
        return HttpClient.newBuilder()
              .version(HttpClient.Version.HTTP_1_1)
              .followRedirects(HttpClient.Redirect.NEVER)
              .connectTimeout(Duration.ofSeconds(5))
              .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }
}
