package com.a604.cake4u.sheetshape.entity;

import com.a604.cake4u.seller.entity.Seller;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
@Entity
//@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SheetShape {
    @SequenceGenerator(
            name="SHEET_SHAPE_SEQ_GEN",
            sequenceName = "SHEET_SHAPE_SEQ",
            initialValue = 100,
            allocationSize = 1
    )

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SHEET_SHAPE_SEQ_GEN")
    private Long id;

//    @OneToOne
//    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
//    private Seller seller;
    private Long sellerId;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean circle = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean heart = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean rectangle = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean others = false;
}
