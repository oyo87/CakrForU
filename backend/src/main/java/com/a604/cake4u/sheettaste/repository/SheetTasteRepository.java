package com.a604.cake4u.sheettaste.repository;

import com.a604.cake4u.sheettaste.entity.SheetTaste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SheetTasteRepository extends JpaRepository<SheetTaste, Long> {
}
