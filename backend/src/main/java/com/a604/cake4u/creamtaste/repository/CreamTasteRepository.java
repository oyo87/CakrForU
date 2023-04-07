package com.a604.cake4u.creamtaste.repository;

import com.a604.cake4u.creamtaste.dto.CreamTasteResponseDto;
import com.a604.cake4u.creamtaste.entity.CreamTaste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CreamTasteRepository extends JpaRepository<CreamTaste, Long> {
    @Query("select new com.a604.cake4u.creamtaste.dto.CreamTasteResponseDto(c) " +
            "from CreamTaste c " +
            "where c.sellerId =:sellerId")
    CreamTasteResponseDto findCreamTaste(@Param("sellerId") Long sellerId);
}
