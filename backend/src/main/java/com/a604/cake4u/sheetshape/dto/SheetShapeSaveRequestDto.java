package com.a604.cake4u.sheetshape.dto;

import com.a604.cake4u.sheetshape.entity.SheetShape;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SheetShapeSaveRequestDto {
    private Long sellerId;
    private boolean circle;
    private boolean heart;
    private boolean rectangle;
    private boolean others;

    public SheetShapeSaveRequestDto(Long sellerId, boolean circle, boolean heart, boolean rectangle, boolean others) {
        this.sellerId = sellerId;
        this.circle = circle;
        this.heart = heart;
        this.rectangle = rectangle;
        this.others = others;
    }

    public SheetShape toEntity() {
        return SheetShape.builder()
                .sellerId(sellerId)
                .circle(circle)
                .heart(heart)
                .rectangle(rectangle)
                .others(others)
                .build();
    }
}
