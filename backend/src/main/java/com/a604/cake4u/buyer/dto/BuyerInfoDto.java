package com.a604.cake4u.buyer.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BuyerInfoDto {

    @ApiParam(value="이메일", required = true)
    private String email;
    @ApiParam(value="변경된 닉네임")
    private String nickname;
    @ApiParam(value="변경된 핸드폰 번호")
    private String phoneNumber;

    @ApiParam(value="변경된 생일")
    private LocalDate birthDate;

}
