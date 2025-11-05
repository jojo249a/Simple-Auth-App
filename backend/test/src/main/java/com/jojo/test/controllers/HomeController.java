package com.jojo.test.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HomeController {
    @GetMapping(path = "hello") 
    public String getMethodName() {
        return "Hello world";
    }
}
