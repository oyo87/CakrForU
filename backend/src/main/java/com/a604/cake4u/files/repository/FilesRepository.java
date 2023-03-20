package com.a604.cake4u.files.repository;

import com.a604.cake4u.files.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FilesRepository extends JpaRepository<Files, Long> {
    Files save(Files files);

    //  주문서 id에 해당하는 이미지 파일을 모두 찾음
    Optional<List<Files>> findAllByOrders_Orders(Long ordersId);
    
    //  포트폴리오 id에 해당하는 이미지 파일을 모두 찾음
    Optional<List<Files>> findAllByPortfolio_PortfolioId(Long portfolioId);
    
    //  판매자 id에 해당하는 이미지 파일을 모두 찾음
    Optional<List<Files>> findAllBySeller_SellerId(Long sellerId);
}
