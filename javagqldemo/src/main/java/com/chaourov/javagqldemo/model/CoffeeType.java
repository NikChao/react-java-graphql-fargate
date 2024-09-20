package com.chaourov.javagqldemo.model;

public enum CoffeeType {
    HOT,
    ICED;

    public String toString() {
        return name().toLowerCase();
    }
}
