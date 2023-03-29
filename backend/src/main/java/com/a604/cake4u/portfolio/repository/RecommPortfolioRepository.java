package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.recommendation.dto.RecommendationFilter;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommPortfolioRepository {
    List<PortfolioResponseDto> findPortfolioRecommended(RecommendationFilter recommendationFilter);
}
