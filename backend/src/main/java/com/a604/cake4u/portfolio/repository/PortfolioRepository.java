package com.a604.cake4u.portfolio.repository;

import com.a604.cake4u.orders.entity.Orders;
import com.a604.cake4u.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
}
