package com.a604.cake4u.portfolio.dto;

import com.a604.cake4u.enums.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CakeFilter {
    private ESheetSize size;

    private EColor color;

    private ESheetShape shape;

    private ESheetTaste sheetTaste;

    private ECreamTaste creamTaste;

    private ESituation situation;

    private EGender gender;
}
