package com.a604.cake4u.sheetshape.repository;

import com.a604.cake4u.sheetshape.dto.SheetShapeResponseDto;
import com.a604.cake4u.sheetshape.entity.SheetShape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SheetShapeRepository extends JpaRepository<SheetShape, Long> {
    @Query("select new com.a604.cake4u.sheetshape.dto.SheetShapeResponseDto(s) " +
            "from SheetShape s " +
            "where s.sellerId=:sellerId")
    SheetShapeResponseDto findSheetShape(@Param("sellerId") Long sellerId);

}
