package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.enums.EGender;
import com.a604.cake4u.enums.ESituation;
import com.a604.cake4u.portfolio.entity.Portfolio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PortfolioRepository extends PagingAndSortingRepository<Portfolio, Long> {


    List<Portfolio> findBySellerId(Long sellerId);

    List<Portfolio> findPortfolioByAgeGroupAndGenderOrderByHitDesc(int age, EGender gender);
    List<Portfolio> findPortfolioBySituationOrderByHitDesc(ESituation situation);
    Page<Portfolio> findAll(Pageable pageable);
}
