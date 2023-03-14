package com.a604.cake4u.orders.entity;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.enums.Status;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@DynamicInsert
public class Orders {

    @SequenceGenerator(
            name = "ORDER_SEQ_GEN",
            sequenceName = "ORDER_SEQ",
            initialValue = 100,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ORDER_SEQ_GEN")
    private Long id;


    @ManyToOne
    // @Column(nullable = false) Todo; Q. 이것도 하는 게 맞는지
    @JoinColumn(name = "buyer_id")
    @Column(nullable = false)
    private Buyer buyer;

    // ToDO; 여기 주석 풀어야 합니다
//    @ManyToOne
//    @JoinColumn(name = "seller_id")
//    private Seller seller;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;


    @Column(nullable = false)
    @Builder.Default
    @ColumnDefault("0")
    private int price = 0;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "pickup_date", nullable = false)
    private LocalDate pickUpDate;

    //Todo; enum. 주석 풀기
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private Size size;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private Shape shape


//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private SheetTaste sheetTaste;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private creamTaste creamTaste;

    @Column(name = "buyer_message")
    private String buyerMessage;

    @Column(name = "review_content")
    private String reviewContent;

    @Column(name = "review_created_at")
    private LocalDate reviewCreatedAt;

    @Column(name = "review_rating")
    private int reviewRating;
}
