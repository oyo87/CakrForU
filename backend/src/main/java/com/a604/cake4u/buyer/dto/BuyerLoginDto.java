package com.a604.cake4u.buyer.dto;


import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerLoginDto {

    @ApiParam(value="로그인 할 아이디", required = true)
    private String email;

    @ApiParam(value="로그인 할 비밀번호", required = true)
    private String password;


}
