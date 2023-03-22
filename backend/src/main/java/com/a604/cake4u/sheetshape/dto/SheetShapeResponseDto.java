package com.a604.cake4u.sheetshape.dto;

import com.a604.cake4u.sheetshape.entity.SheetShape;
import lombok.Getter;

@Getter
public class SheetShapeResponseDto {
    private Long id;
    private Long sellerId;
    private boolean circle;
    private boolean heart;
    private boolean rectangle;
    private boolean others;

    public SheetShapeResponseDto(SheetShape sheetShape) {
        this.id = sheetShape.getId();
        this.sellerId = sheetShape.getSellerId();
        this.circle = sheetShape.isCircle();
        this.heart = sheetShape.isHeart();
        this.rectangle = sheetShape.isRectangle();
        this.others = sheetShape.isOthers();
    }
}
