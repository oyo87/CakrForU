package com.a604.cake4u.sheettaste.repository;

import com.a604.cake4u.sheettaste.dto.SheetTasteResponseDto;
import com.a604.cake4u.sheettaste.entity.SheetTaste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SheetTasteRepository extends JpaRepository<SheetTaste, Long> {
    @Query("select new com.a604.cake4u.sheettaste.dto.SheetTasteResponseDto(s) " +
            "from SheetTaste s " +
            "where s.sellerId =:sellerId")
    SheetTasteResponseDto findSheetTaste(Long sellerId);
}
