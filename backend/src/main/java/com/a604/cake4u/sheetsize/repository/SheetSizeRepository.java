package com.a604.cake4u.sheetsize.repository;

import com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto;
import com.a604.cake4u.sheetsize.entity.SheetSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SheetSizeRepository extends JpaRepository<SheetSize, Long> {
    @Query("select new com.a604.cake4u.sheetsize.dto.SheetSizeResponseDto(s) " +
            "from SheetSize s " +
            "where s.sellerId=:sellerId")
    SheetSizeResponseDto findSheetSize(Long sellerId);
}
