package com.a604.cake4u.sheettaste.dto;

import com.a604.cake4u.sheettaste.entity.SheetTaste;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SheetTasteUpdateRequestDto {
    private Long id;
    private Long sellerId;
    private boolean vanilla;
    private boolean chocolate;
    private boolean earl_gray;
    private boolean red_velvet;
    private boolean matcha;
    private boolean mocha;
    private boolean cheese;
    private boolean carrot;
    private boolean sweet_potato;

    public SheetTasteUpdateRequestDto(Long id, Long sellerId, boolean vanilla, boolean chocolate, boolean earlGray, boolean redVelvet, boolean matcha, boolean mocha, boolean cheese, boolean carrot, boolean sweetPotato) {
        this.id = id;
        this.sellerId = sellerId;
        this.vanilla = vanilla;
        this.chocolate = chocolate;
        this.earl_gray = earlGray;
        this.red_velvet = redVelvet;
        this.matcha = matcha;
        this.mocha = mocha;
        this.cheese = cheese;
        this.carrot = carrot;
        this.sweet_potato = sweetPotato;
    }

    public SheetTaste toEntity() {
        return SheetTaste.builder()
                .id(id)
                .sellerId(sellerId)
                .vanilla(vanilla)
                .chocolate(chocolate)
                .earlGray(earl_gray)
                .redVelvet(red_velvet)
                .matcha(matcha)
                .cheese(cheese)
                .carrot(carrot)
                .sweetPotato(sweet_potato)
                .mocha(mocha)
                .build();
    }
}
