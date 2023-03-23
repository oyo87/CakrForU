package com.a604.cake4u.orders.entity;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.enums.*;
import com.a604.cake4u.imagefile.entity.ImageFile;
import com.a604.cake4u.seller.entity.Seller;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@DynamicInsert
public class OrderSheet {

    @SequenceGenerator(
            name = "ORDER_SHEET_SEQ_GEN",
            sequenceName = "ORDER_SHEET_SEQ",
            initialValue = 100,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ORDER_SHEET_SEQ_GEN")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id", referencedColumnName = "id", nullable = false)
    private Buyer buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
    private Seller seller;

    //  주문서에서 파일로 접근 가능하도록 참조자
    @OneToMany(mappedBy = "orderSheet", fetch = EAGER)
    @Builder.Default
    private List<ImageFile> imageFileList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EStatus status;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(nullable = true)
    @ColumnDefault("0")
    private int price = 0;

    //  입금 기한
    @Column(name = "due_date", nullable = true)
    private LocalDate dueDate;

    //  픽업 날짜
    @Column(name = "pickup_date", nullable = true)
    private LocalDate pickUpDate;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ESheetSize sheetSize;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ESheetShape sheetShape;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ESheetTaste sheetTaste;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ECreamTaste creamTaste;

    @Column(name = "buyer_message", length = 4096)
    private String buyerMessage;

    @Column(name = "review_content", columnDefinition = "LONGTEXT")
    private String reviewContent;

    @Column(name = "review_created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp reviewCreatedAt;

    @Column(name = "review_rating")
    private int reviewRating;

    public void addOrderSheetImageFile(ImageFile imageFile) {
        this.imageFileList.add(imageFile);
    }
}
