package com.a604.cake4u.area.repository;

import com.a604.cake4u.area.dto.GugunDto;
import com.a604.cake4u.area.entity.GugunCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GugunCodeRepository extends JpaRepository<GugunCode, String> {
    //Dto에서 getGugunName() 하기 때문에 카멜케이스 맞춰야 인식해서 가져옴, 그래서 as로 별칭줘야 인식할 수 있음
    @Query(value = "select left(g.gugun_code,5) as gugunCode, g.gugun_name as gugunName " +
            "from gugun_code g " +
            "where left(g.gugun_code,2) =:sidoCode " +
            "order by g.gugun_code", nativeQuery = true)
    List<GugunDto> getGugunInSido(@Param("sidoCode") String sidoCode); //시,군,구 리스트를 가져오는 쿼리
}