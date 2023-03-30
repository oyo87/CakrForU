package com.a604.cake4u.sheetshape.dto;

import com.a604.cake4u.sheetshape.entity.SheetShape;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class SheetShapeUpdateRequestDto {
    private Long id;
    private Long sellerId;
    private boolean circle;
    private boolean heart;
    private boolean rectangle;
    private boolean others;

    public SheetShapeUpdateRequestDto(Long id, Long sellerId, boolean circle, boolean heart, boolean rectangle, boolean others) {
        this.id = id;
        this.sellerId = sellerId;
        this.circle = circle;
        this.heart = heart;
        this.rectangle = rectangle;
        this.others = others;
    }

    public SheetShape toEntity() {
        return SheetShape.builder()
                .id(id)
                .sellerId(sellerId)
                .circle(circle)
                .heart(heart)
                .rectangle(rectangle)
                .others(others)
                .build();
    }
}
