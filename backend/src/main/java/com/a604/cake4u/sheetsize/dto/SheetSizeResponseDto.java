package com.a604.cake4u.sheetsize.dto;

import com.a604.cake4u.sheetsize.entity.SheetSize;
import lombok.*;

@Getter
public class SheetSizeResponseDto {
    private Long id;
    private Long sellerId;
    private boolean no1;
    private boolean no2;
    private boolean no3;
    private boolean mini;

    public SheetSizeResponseDto(SheetSize size) {
        this.id = size.getId();
        this.sellerId = size.getSellerId();
        this.no1 = size.isNo1();
        this.no2 = size.isNo2();
        this.no3 = size.isNo3();
        this.mini = size.isMini();
    }
}
