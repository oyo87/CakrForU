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
    private boolean blackSesameCream;
    private boolean sweetPotatoCream;
    private boolean earlGrayCream;
    private boolean strawberryCream;

    public CreamTasteSaveRequestDto(Long sellerId, boolean creamCheese, boolean whippingCream, boolean chocolateCream, boolean oreoCream, boolean matchaCream, boolean blackSesameCream, boolean sweetPotatoCream, boolean earlGrayCream) {
        this.sellerId = sellerId;
        this.creamCheese = creamCheese;
        this.whippingCream = whippingCream;
        this.chocolateCream = chocolateCream;
        this.oreoCream = oreoCream;
        this.matchaCream = matchaCream;
        this.blackSesameCream = blackSesameCream;
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
                .blackSesameCream(blackSesameCream)
                .sweetPotatoCream(sweetPotatoCream)
                .earlGrayCream(earlGrayCream)
                .build();
    }
}
