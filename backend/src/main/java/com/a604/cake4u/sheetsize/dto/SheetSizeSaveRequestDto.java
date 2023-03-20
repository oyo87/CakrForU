package com.a604.cake4u.sheetsize.dto;

import com.a604.cake4u.sheetsize.entity.SheetSize;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
public class SheetSizeSaveRequestDto {
    private Long sellerId;
    private boolean no1;
    private boolean no2;
    private boolean no3;
    private boolean mini;

    public SheetSizeSaveRequestDto(Long sellerId, boolean no1, boolean no2, boolean no3, boolean mini) {
        this.sellerId = sellerId;
        this.no1 = no1;
        this.no2 = no2;
        this.no3 = no3;
        this.mini = mini;
    }

    public SheetSize toEntity() {
        return SheetSize.builder()
                .sellerId(sellerId)
                .no1(no1)
                .no2(no2)
                .no3(no3)
                .mini(mini)
                .build();
    }
}
