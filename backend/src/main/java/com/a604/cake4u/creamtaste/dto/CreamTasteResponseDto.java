package com.a604.cake4u.creamtaste.dto;

import com.a604.cake4u.creamtaste.entity.CreamTaste;
import lombok.*;

@Getter
@Setter
public class CreamTasteResponseDto {
    private Long id;
    private Long sellerId;
    private boolean creamCheese;
    private boolean whippingCream;
    private boolean chocolateCream;
    private boolean oreoCream;
    private boolean matchaCream;
    private boolean blackSeasameCream;
    private boolean sweetPotatoCream;
    private boolean earlGrayCream;

    public CreamTasteResponseDto(CreamTaste entity) {
        this.id = entity.getId();
        this.sellerId = entity.getSellerId();
        this.creamCheese = entity.isCreamCheese();
        this.whippingCream = entity.isWhippingCream();
        this.chocolateCream = entity.isChocolateCream();
        this.oreoCream = entity.isOreoCream();
        this.matchaCream = entity.isMatchaCream();
        this.blackSeasameCream = entity.isBlackSeasameCream();
        this.sweetPotatoCream = entity.isSweetPotatoCream();
        this.earlGrayCream = entity.isEarlGrayCream();
    }
}
