package com.example.mylogbe.Test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/test/")
public class TestController {

    @GetMapping(value = "hello")
    public ResponseEntity<String> Test() {
        return ResponseEntity.ok().body("안녕 ~ !!");
    }

}
