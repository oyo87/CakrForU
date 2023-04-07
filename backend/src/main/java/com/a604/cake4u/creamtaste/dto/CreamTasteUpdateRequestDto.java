package com.a604.cake4u.creamtaste.dto;

import com.a604.cake4u.creamtaste.entity.CreamTaste;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CreamTasteUpdateRequestDto {
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

    public CreamTasteUpdateRequestDto(Long id, Long sellerId, boolean cream_cheese, boolean whipping_cream, boolean chocolate_cream, boolean oreo_cream, boolean matcha_cream, boolean black_sesame_cream, boolean sweet_potato_cream, boolean earl_gray_cream, boolean strawberry_cream) {
        this.id = id;
        this.sellerId = sellerId;
        this.cream_cheese = cream_cheese;
        this.whipping_cream = whipping_cream;
        this.chocolate_cream = chocolate_cream;
        this.oreo_cream = oreo_cream;
        this.matcha_cream = matcha_cream;
        this.black_sesame_cream = black_sesame_cream;
        this.sweet_potato_cream = sweet_potato_cream;
        this.earl_gray_cream = earl_gray_cream;
        this.strawberry_cream = strawberry_cream;
    }

    public CreamTaste toEntity() {
        return CreamTaste.builder()
                .id(id)
                .sellerId(sellerId)
                .creamCheese(cream_cheese)
                .whippingCream(whipping_cream)
                .chocolateCream(chocolate_cream)
                .oreoCream(oreo_cream)
                .matchaCream(matcha_cream)
                .blackSesameCream(black_sesame_cream)
                .sweetPotatoCream(sweet_potato_cream)
                .earlGrayCream(earl_gray_cream)
                .strawberryCream(strawberry_cream)
                .build();
    }
}
