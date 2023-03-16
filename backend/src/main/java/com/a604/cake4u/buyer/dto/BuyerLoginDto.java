package com.a604.cake4u.buyer.dto;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerLoginDto {

    private String email;

    private String password;


}
