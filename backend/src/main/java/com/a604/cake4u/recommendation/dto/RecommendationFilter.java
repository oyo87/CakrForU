package com.a604.cake4u.recommendation.dto;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.imagefile.entity.ImageFile;
import com.a604.cake4u.seller.entity.Seller;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

/**
 * 추천을 위한 QueryDSL 필터
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RecommendationFilter {
    private Integer hit;
    private LocalDate from;
    private LocalDate to;
    private EGender gender;
    private ESituation situation;
    private Integer ageGroup;
    private ESheetSize size;
    private EColor color;
    private ESheetShape shape;
    private ESheetTaste sheetTaste;
    private ECreamTaste creamTaste;
}
