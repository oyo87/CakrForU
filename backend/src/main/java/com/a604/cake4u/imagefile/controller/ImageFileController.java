package com.a604.cake4u.imagefile.controller;

import com.a604.cake4u.imagefile.service.ImageFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getSellerImageFileUrls(@PathVariable(name = "sellerId") Long sellerId) {
       return new ResponseEntity<>(imageFileService.getSellerImageFileUrls(sellerId), HttpStatus.OK);
    }

    @GetMapping("/order-sheet/{orderSheetId}")
    public ResponseEntity<?> getOrderSheetImageFileUrls(@PathVariable(name = "orderSheetId") Long orderSheetId) {
        return new ResponseEntity<>(imageFileService.getOrderSheetImageFileUrls(orderSheetId), HttpStatus.OK);
    }

    @GetMapping("/portfolio/{portfolioId}")
    public ResponseEntity<?> getPortfolioImageFileUrls(@PathVariable(name = "portfolioId") Long portfolioId) {
        return new ResponseEntity<>(imageFileService.getPortfolioImageFileUrls(portfolioId), HttpStatus.OK);
    }
}
