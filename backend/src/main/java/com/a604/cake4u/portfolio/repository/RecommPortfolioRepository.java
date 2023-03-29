package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.recommendation.dto.RecommendationFilter;

import java.util.List;

public interface RecommPortfolioRepository {
    List<PortfolioResponseDto> findPortfolioRecommended(RecommendationFilter recommendationFilter);
}
