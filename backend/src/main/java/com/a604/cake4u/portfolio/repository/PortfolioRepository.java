package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {


    List<Portfolio> findBySellerId(Long sellerId);

}
