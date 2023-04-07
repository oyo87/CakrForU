package com.a604.cake4u.portfolio.dto;

import com.a604.cake4u.enums.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PortfolioUpdateDto {
    private long Id;

    private EGender gender;

    private ESituation situation;

    private int ageGroup;

    private ESheetSize size;

    private ESheetShape shape;

    private EColor color;

    private ESheetTaste sheetTaste;

    private ECreamTaste creamTaste;

    private String detail;

    //    파일은 따로 관리했다고함 프론트에서 따로 전송
//    private String fileUri;
//
//    private String fileName;
//
//    private String type;
}
