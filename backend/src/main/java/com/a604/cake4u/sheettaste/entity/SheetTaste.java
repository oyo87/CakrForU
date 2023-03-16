package com.a604.cake4u.sheettaste.entity;

import com.a604.cake4u.seller.entity.Seller;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
@Entity
@AllArgsConstructor
@Getter
@Setter
public class SheetTaste {

    //@NoArgsConstructor 사용X
    public SheetTaste() {
    }

    @SequenceGenerator(
            name="SHEET_TASTE_SEQ_GEN",
            sequenceName = "SHEET_TASTE_SEQ",
            initialValue = 100,
            allocationSize = 1
    )

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SHEET_TASTE_SEQ_GEN")
    private Long id;

//    @OneToOne
//    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
//    private Seller seller;
    private Long sellerId;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean vanila = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean chocolate = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean earlGray = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean redVelvet = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean matcha = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean mocha = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean cheese = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean carrot = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean sweetPotato = false;
}
