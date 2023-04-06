package com.a604.cake4u.creamtaste.dto;

import com.a604.cake4u.creamtaste.entity.CreamTaste;
import lombok.*;

@Getter
@Setter
public class CreamTasteResponseDto {
    private Long id;
    private Long sellerId;
    private boolean cream_cheese;
    private boolean whipping_cream;
    private boolean chocolate_cream;
    private boolean oreo_cream;
    private boolean matcha_cream;
    private boolean black_sesame_cream;
    private boolean sweet_potato_cream;
    private boolean earl_gray_cream;
    private boolean strawberry_cream;

    public CreamTasteResponseDto(CreamTaste entity) {
        this.id = entity.getId();
        this.sellerId = entity.getSellerId();
        this.cream_cheese = entity.isCreamCheese();
        this.whipping_cream = entity.isWhippingCream();
        this.chocolate_cream = entity.isChocolateCream();
        this.oreo_cream = entity.isOreoCream();
        this.matcha_cream = entity.isMatchaCream();
        this.black_sesame_cream = entity.isBlackSesameCream();
        this.sweet_potato_cream = entity.isSweetPotatoCream();
        this.earl_gray_cream = entity.isEarlGrayCream();
        this.strawberry_cream = entity.isStrawberryCream();
    }
}
