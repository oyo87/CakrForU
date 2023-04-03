package com.a604.cake4u.imagefile.controller;

import com.a604.cake4u.imagefile.service.ImageFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image-file")
@RequiredArgsConstructor
@Slf4j
public class ImageFileController {

    private final ImageFileService imageFileService;

//    @GetMapping("/seller/{sellerId}")
//    public ResponseEntity<?> getSellerImageFiles(@PathVariable(name = "sellerId") Long sellerId) {
//
//    }
//
//    @GetMapping("/portfolio/{portfolioId}")
//    public ResponseEntity<?> getPortfolioImageFiles(@PathVariable(name = "portfolioId") Long portfolioId) {
//
//    }
}
