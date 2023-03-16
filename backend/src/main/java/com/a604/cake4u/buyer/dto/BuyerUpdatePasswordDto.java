package com.a604.cake4u.buyer.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerUpdatePasswordDto {

    private String email;

    private String prePassword;

    private String newPassword;



}
