package com.a604.cake4u.area.repository;

import com.a604.cake4u.area.dto.SidoDto;
import com.a604.cake4u.area.entity.SidoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SidoCodeRepository extends JpaRepository<SidoCode, String> {
    @Query(value="select left(s.sido_code, 2) as sidoCode, s.sido_name as sidoName " +
            "from sido_code s " +
            "order by s.sido_code", nativeQuery = true)
    List<SidoDto> getSido(); //시,도 리스트를 가져오는 쿼리
}
