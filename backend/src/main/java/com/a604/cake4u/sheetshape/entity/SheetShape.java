package com.a604.cake4u.sheetshape.entity;

import lombok.Builder;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

public class SheetShape {

    @OneToOne
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
    private boolean circle = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean heart = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean rectangle = false;

    @Builder.Default
    @ColumnDefault("0")
    @Enumerated(EnumType.STRING)
    private boolean others = false;
}
