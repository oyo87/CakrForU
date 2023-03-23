package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.enums.EGender;
import com.a604.cake4u.portfolio.dto.PortfolioResponseDto;
import com.a604.cake4u.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {


    List<Portfolio> findBySellerId(Long sellerId);

    List<Portfolio> findPortfolioByAgeGroupAndGenderOrderByHitDesc(int age, EGender gender);

}
