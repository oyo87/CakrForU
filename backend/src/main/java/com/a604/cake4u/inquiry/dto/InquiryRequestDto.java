package com.a604.cake4u.inquiry.dto;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.seller.entity.Seller;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class InquiryRequestDto {

    private String title;
    private String content;
    private LocalDate createdAt;
    private Buyer buyer;
    private Seller seller;


}
