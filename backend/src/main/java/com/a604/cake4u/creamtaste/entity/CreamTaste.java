package com.a604.cake4u.creamtaste.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreamTaste {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //100시작 vs 오토생성
    private Long id;

//    @OneToOne
//    @Column(nullable = false)
//    @JoinColumn(name = "id")
//    private Seller seller;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean creamCheese = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean whippingCream = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean chocolateCream = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean oreoCream = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean matchaCream = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean blackSeasameCream = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean sweetPotatoCream = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean earlGrayCream = false;
}
