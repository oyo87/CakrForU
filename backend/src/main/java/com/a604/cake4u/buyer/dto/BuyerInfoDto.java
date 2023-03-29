package com.a604.cake4u.buyer.dto;

import com.a604.cake4u.enums.EGender;
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

    @ApiParam
    private Long id;

    @ApiParam(value="이메일", required = true)
    private String email;
    @ApiParam(value="변경된 닉네임")
    private String nickname;
    @ApiParam(value="변경된 핸드폰 번호")
    private String phoneNumber;

    @ApiParam(value="변경된 생일")
    private int age;

    @ApiParam
    private EGender gender;

}
