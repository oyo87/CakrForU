package com.a604.cake4u.inquiry.entity;

import com.a604.cake4u.buyer.entity.Buyer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Inquiry {

    @Id
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @Column(nullable = false, name = "created_at")
    private LocalDate createdAt;
    // 문의를 작성한 회원(구매자)
    @JoinColumn(nullable = false, name = "buyer_id", referencedColumnName = "id")
    private Buyer buyer;
    // 문의를 받는 판매자
    @JoinColumn(nullable = false, name = "seller_id", referencedColumnName = "id")
    private Seller seller;
}
