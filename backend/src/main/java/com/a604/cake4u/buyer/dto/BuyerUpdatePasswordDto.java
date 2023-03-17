package com.a604.cake4u.buyer.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerUpdatePasswordDto {

    @ApiParam(value="비밀번호를 업데이트 할 계정의 이메일", required = true, example = "example@naver.com")
    private String email;

    @ApiParam(value="이전 비밀번호", required = true)
    private String prePassword;

    @ApiParam(value="새로운 비밀번호", required = true)
    private String newPassword;



}
