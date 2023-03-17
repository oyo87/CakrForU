package com.a604.cake4u.sheetsize.repository;

import com.a604.cake4u.sheetsize.entity.SheetSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SheetSizeRepository extends JpaRepository<SheetSize, Long> {
}
