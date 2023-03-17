package com.a604.cake4u.sheetsize.entity;

import com.a604.cake4u.seller.entity.Seller;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
@Entity
@AllArgsConstructor
@Getter
@Setter
public class SheetSize {

    //@NoArgsConstructor 사용X
    public SheetSize() {
    }

    @SequenceGenerator(
            name="SHEET_SIZE_SEQ_GEN",
            sequenceName = "SHEET_SIZE_SEQ",
            initialValue = 100,
            allocationSize = 1
    )



    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SHEET_SIZE_SEQ_GEN")
    private Long id;

//    @OneToOne
//    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
//    private Seller seller;
    private Long sellerId;
    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean no1 = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean no2 = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean no3 = false;

    @Builder.Default
    @ColumnDefault("0")
//    @Enumerated(EnumType.STRING)
    private boolean mini = false;
}
