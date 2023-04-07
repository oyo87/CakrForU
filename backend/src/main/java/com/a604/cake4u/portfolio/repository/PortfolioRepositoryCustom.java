package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.portfolio.dto.CakeFilter;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;

import java.util.List;

public interface PortfolioRepositoryCustom {

    List<PortfolioResponseDto> findPortfolioCakeFilter(CakeFilter cakeFilter);

}
