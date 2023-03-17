package com.a604.cake4u.orders.repository;

import com.a604.cake4u.orders.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
}
