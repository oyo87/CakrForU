package com.a604.cake4u.recommendation.controller;

import com.a604.cake4u.enums.EGender;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.recommendation.service.RecommendationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api("Recommendation Controller")
@RequiredArgsConstructor
@RestController("/recommendation")
public class RecommendationController {
    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/gender-and-age")
    public ResponseEntity<?> recommendByGenderAndAge(@RequestParam(value="age") int age,
                                                     @RequestParam(value="gender") String gender){
        List<PortfolioResponseDto> portfolios = recommendationService.getPortfolioRecommendationByAgeAndGender(age, EGender.valueOf(gender));
        return ResponseEntity.status(HttpStatus.OK).body(portfolios);
    }

}