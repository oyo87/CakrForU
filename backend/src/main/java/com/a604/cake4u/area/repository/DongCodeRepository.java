package com.a604.cake4u.area.repository;

import com.a604.cake4u.area.dto.DongDto;
import com.a604.cake4u.area.dto.SiGuDongDto;
import com.a604.cake4u.area.entity.DongCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DongCodeRepository extends JpaRepository<DongCode, String> {
    @Query(value = "select distinct d.dong_name as dongName, d.dong_code as dongCode " +
            "from dong_code d " +
            "where left(d.dong_code, 5) =:gugunCode and d.dong_code is not null and d.dong_name is not null " +
            "order by d.dong_name", nativeQuery = true)
    List<DongDto> getDongInGugun(@Param("gugunCode") String gugunCode); //동을 가져오는 쿼리

    @Query(value = "select d.sidoName, d.gugunName, d.dongName " +
            "from DongCode d " +
            "where d.dongCode =:dongCode")
    SiGuDongDto getAddressName(@Param("dongCode") String dongCode); //시,구,동을 조회하는 쿼리
}