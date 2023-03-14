package com.a604.cake4u.sheettaste.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SheetTaste {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //100시작 vs 오토생성
    private Long id;

//    @OneToOne
//    @Column(nullable = false)
//    @JoinColumn(name = "id")
//    @Column(name = "seller_id")
//    private Seller seller;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean vanila = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean chocolate = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean earlGray = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean redVelvet = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean matcha = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean mocha = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean cheese = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean carrot = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean sweetPotato = false;
}
