package com.a604.cake4u.buyer.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerResponseDto {

    private String nickname;
    private String phoneNumber;
    private LocalDate birthDate;

}
