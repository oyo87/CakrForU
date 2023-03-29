package com.a604.cake4u.recommendation.service;

import com.a604.cake4u.enums.EGender;
import com.a604.cake4u.enums.ESituation;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import com.a604.cake4u.portfolio.repository.PortfolioRepository;
import com.a604.cake4u.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RecommendationService {

    @Value("${flask.baseurl}")
    private String baseurl;
    @Autowired
    private PortfolioRepository portfolioRepository;
    @Autowired
    private PortfolioService portfolioService;

    public List<PortfolioResponseDto> getPortfolioRecommendationByAgeAndGender(int page, int age, EGender gender){
        Page<Portfolio> portfolioList = portfolioRepository.findPortfolioByAgeGroupAndGenderOrderByHitDesc(PageRequest.of(page, 20, Sort.by("hit").descending()),age, gender);
        List<Portfolio> portfolios = portfolioList.getContent();
        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();

        for (Portfolio p : portfolios) {
            portfolioDtos.add(portfolioService.portfolioEntityToPortfolioResponseDTO(p));
        }
        return portfolioDtos;
    };

    public List<PortfolioResponseDto> getPortfolioRecommendationBySituation(int page, ESituation situation){
        Page<Portfolio> portfolioList = portfolioRepository.findPortfolioBySituationOrderByHitDesc(PageRequest.of(page, 20, Sort.by("hit").descending()), situation);
        List<Portfolio> portfolios = portfolioList.getContent();
        List<PortfolioResponseDto> portfolioDtos = new ArrayList<>();
        for (Portfolio p : portfolios){
            portfolioDtos.add(portfolioService.portfolioEntityToPortfolioResponseDTO(p));
        }
        return portfolioDtos;
    }

    @Async
    @Transactional
    public List<PortfolioResponseDto> getPortfolioRecommendationByWishlist(Long userId){
        RestTemplate restTemplate = new RestTemplate();

        List<PortfolioResponseDto> recommendPortfolios = new ArrayList<>();
        String url = baseurl + "/db/" + userId;
        Long[] recommends = restTemplate.getForObject(url, Long[].class);
        for(Long recommend : recommends){
            recommendPortfolios.add(portfolioService.portfolioEntityToPortfolioResponseDTO(portfolioRepository.findById(recommend).get()));
        }

        return recommendPortfolios;
    }

}
