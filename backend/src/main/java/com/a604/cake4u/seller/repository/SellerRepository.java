package com.a604.cake4u.seller.repository;

import com.a604.cake4u.seller.dto.SellerResponseDto;
import com.a604.cake4u.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findByEmail(String email);

    @Query("select new com.a604.cake4u.seller.dto.SellerResponseDto(s) " +
            "from Seller s " +
            "where s.id=:sellerId")
    SellerResponseDto findSellerInfo(@Param("sellerId") Long sellerId);

    @Query(value = "select new com.a604.cake4u.seller.dto.SellerResponseDto(s) " +
            "from Seller s " +
            "order by s.averageScore desc")
    List<SellerResponseDto> AllSeller();

    @Query(value = "select new com.a604.cake4u.seller.dto.SellerResponseDto(s) " +
            "from Seller s " +
            "where s.dongCode =:dongCode " +
            "order by s.averageScore desc")
    List<SellerResponseDto> searchSeller(@Param("dongCode") String dongCode);

}
