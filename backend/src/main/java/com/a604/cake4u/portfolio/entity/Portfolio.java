package com.a604.cake4u.portfolio.entity;

import com.a604.cake4u.enums.Situation;
import com.a604.cake4u.seller.entity.Seller;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.awt.*;
import java.time.LocalDateTime;

@Entity
@Table(name="portfolio")
@Setter
@Getter
@NoArgsConstructor
public class Portfolio {
    @SequenceGenerator(
            name="PORTFOLIO_SEQ_GEN",
            sequenceName = "PORTFOLIO_SEQ",
            initialValue = 10000,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PORTFOLIO_SEQ_GEN")
    @Column(nullable = false)
    private Long id;

    @ManyToOne
    @Enumerated(EnumType.ORDINAL)
    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
    private Seller seller;
    @Column(nullable = false)
    private int hit;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private Situation situation;
    @Column(name="age_group", nullable = false)
    private int ageGroup;
    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Size size;
    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Color color;
    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private Shape shape;
    @Enumerated(EnumType.ORDINAL)
    @Column(name="sheet_taset", nullable = false)
    private SheetTaste sheetTaste;
    @Enumerated(EnumType.ORDINAL)
    @Column(name="cream_taste", nullable = false)
    private CreamTaste creamTaste;
    @Column(nullable = false)
    private String detail;
}
