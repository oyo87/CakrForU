package com.a604.cake4u.inquiry.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
    @Column(nullable = false)
    private LocalDate createdAt;
    // 문의를 작성한 회원(구매자)
    @Column(nullable = false)
    private Buyer buyer;
    // 문의를 받는 판매자
    @Column(nullable = false)
    private Seller seller;
}
