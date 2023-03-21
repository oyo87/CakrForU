package com.a604.cake4u.sheettaste.dto;

import com.a604.cake4u.sheettaste.entity.SheetTaste;
import lombok.*;

@Getter
@Setter
public class SheetTasteResponseDto {
    private Long id;
    private Long sellerId;
    private boolean vanila;
    private boolean chocolate;
    private boolean earlGray;
    private boolean redVelvet;
    private boolean matcha;
    private boolean mocha;
    private boolean cheese;
    private boolean carrot;
    private boolean sweetPotato;

    public SheetTasteResponseDto(SheetTaste entity) {
        this.id = entity.getId();
        this.sellerId = entity.getSellerId();
        this.vanila = entity.isVanila();
        this.chocolate = entity.isChocolate();
        this.earlGray = entity.isEarlGray();
        this.redVelvet = entity.isRedVelvet();
        this.matcha = entity.isMatcha();
        this.mocha = entity.isMocha();
        this.cheese = entity.isCheese();
        this.carrot = entity.isCarrot();
        this.sweetPotato = entity.isSweetPotato();
    }
}
