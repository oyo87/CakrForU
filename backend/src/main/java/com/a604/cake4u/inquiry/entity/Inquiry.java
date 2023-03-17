package com.a604.cake4u.inquiry.entity;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.seller.entity.Seller;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Inquiry {
    @SequenceGenerator(
            name="INQUIRY_SEQ_GEN",
            sequenceName = "INQUIRY_SEQ",
            initialValue = 100,
            allocationSize = 1
    )

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "INQUIRY_SEQ_GEN")
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @Column(nullable = false, name = "created_at")
    private LocalDate createdAt;
    // 문의를 작성한 회원(구매자)
    @ManyToOne
    @JoinColumn(nullable = false, name = "buyer_id", referencedColumnName = "id")
    private Buyer buyer;
    @ManyToOne
    // 문의를 받는 판매자
    @JoinColumn(nullable = false, name = "seller_id", referencedColumnName = "id")
    private Seller seller;
}
