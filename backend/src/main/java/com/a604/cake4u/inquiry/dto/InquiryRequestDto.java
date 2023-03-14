package com.a604.cake4u.inquiry.dto;

import java.time.LocalDate;

public class InquiryRequestDto {

    private Long id;
    private String title;
    private String content;
    private LocalDate createdAt;
    private Buyer buyer;
    private Seller seller;
}
