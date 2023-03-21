package com.a604.cake4u.creamtaste.dto;

import com.a604.cake4u.creamtaste.entity.CreamTaste;
import lombok.*;

@Getter
@Setter
public class CreamTasteSaveRequestDto {
    private Long sellerId;
    private boolean creamCheese;
    private boolean whippingCream;
    private boolean chocolateCream;
    private boolean oreoCream;
    private boolean matchaCream;
    private boolean blackSeasameCream;
    private boolean sweetPotatoCream;
    private boolean earlGrayCream;

    public CreamTasteSaveRequestDto(Long sellerId, boolean creamCheese, boolean whippingCream, boolean chocolateCream, boolean oreoCream, boolean matchaCream, boolean blackSeasameCream, boolean sweetPotatoCream, boolean earlGrayCream) {
        this.sellerId = sellerId;
        this.creamCheese = creamCheese;
        this.whippingCream = whippingCream;
        this.chocolateCream = chocolateCream;
        this.oreoCream = oreoCream;
        this.matchaCream = matchaCream;
        this.blackSeasameCream = blackSeasameCream;
        this.sweetPotatoCream = sweetPotatoCream;
        this.earlGrayCream = earlGrayCream;
    }

    public CreamTaste toEntity() {
        return CreamTaste.builder()
                .sellerId(sellerId)
                .creamCheese(creamCheese)
                .whippingCream(whippingCream)
                .chocolateCream(chocolateCream)
                .oreoCream(oreoCream)
                .matchaCream(matchaCream)
                .blackSeasameCream(blackSeasameCream)
                .sweetPotatoCream(sweetPotatoCream)
                .earlGrayCream(earlGrayCream)
                .build();
    }
}
