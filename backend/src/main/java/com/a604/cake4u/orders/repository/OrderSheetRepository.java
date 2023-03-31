package com.a604.cake4u.orders.repository;

import com.a604.cake4u.enums.EStatus;
import com.a604.cake4u.orders.entity.OrderSheet;
import com.querydsl.core.types.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import springfox.documentation.spring.data.rest.EntityAssociationSaveExtractor;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderSheetRepository extends JpaRepository<OrderSheet, Long> {
    //  구매자 id로 해당 구매자의 모든 주문 찾음
    @Query(value = "select o from OrderSheet o where o.buyer.id = :buyerId order by o.id desc")
    Optional<List<OrderSheet>> findAllOrderSheetByBuyerId(@Param("buyerId") Long buyerId);

    //  판매자 id로 해당 판매자의 모든 주문 찾음
    @Query(value = "select o from OrderSheet o where o.seller.id = :sellerId order by o.id desc")
    Optional<List<OrderSheet>> findAllOrderSheetBySellerId(@Param("sellerId") Long sellerId);

    //  구매자의 주문 상태에 따른 검색
    @Query(value = "select o from OrderSheet o where o.buyer.id = :buyerId and o.status = :status order by o.id desc")
    Optional<List<OrderSheet>> findOrderSheetsByBuyer_IdAndStatusOrderById_IdDesc(Long buyerId, EStatus status);

    //  판매자의 주문 상태에 따른 검색
    @Query(value = "select o from OrderSheet o where o.seller.id = :sellerId and o.status = :status order by o.id desc")
    Optional<List<OrderSheet>> findOrderSheetsBySeller_IdAndStatusOrderById_IdDesc(Long sellerId, EStatus status);
}
